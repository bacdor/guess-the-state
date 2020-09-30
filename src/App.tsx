import React from 'react';
import './App.css';
import states from "./states";
import questions from "./questions";
import ReactDOM from 'react-dom';
import './index.css';
import TitlePage from "./titlePage";
import EndPage from "./endPage";

interface IProps {
}

interface IState {
  statesList: string[];
  questionIndex: number;
  doNotKnowCounter: number;
}

let questionsTemp = questions.map(value => ({name: value.name, quest: value.quest}));

class App extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      statesList: states.map(value => (value.name)),
      questionIndex: Math.floor(Math.random() * questions.length),
      doNotKnowCounter: 0
    };
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleStopButton = this.handleStopButton.bind(this)
  }

  componentDidUpdate() {
    console.log(this.state.statesList)
    let output: string | HTMLSpanElement= ""

    if(this.state.statesList.length === 1) {
      output = `I know!!! It's \r ${this.state.statesList[0]}`.toUpperCase();
    } else if (this.state.doNotKnowCounter >= 3) {
      output = "---IT SEEMS LIKE YOU DON'T REALLY KNOW YOUR STATE---"
    } else if (questionsTemp.length === 0) {
      output = "---QUESTIONS OUT OF STOCK---";
    } else if (this.state.statesList.length === 0) {
      output = "---THERE IS NO STATE THAT MATCHES YOUR ANSWERS---"
    }

    if(output !== "") {
      ReactDOM.render(
        <React.StrictMode>
          <EndPage props={output} key={output} type={Element}/>
        </React.StrictMode>,
        document.getElementById('root'))
    }
  }

  componentWillUnmount() {
    questionsTemp = questions.map(value => ({name: value.name, quest: value.quest}));
    this.setState({
      statesList: states.map(value => (value.name)),
      questionIndex: Math.floor(Math.random() * questions.length),
      doNotKnowCounter: 0
    })
  }

  handleAnswer(event: any) {
    let currentIndex: number = this.state.questionIndex;
    let questionValue: string = questionsTemp[currentIndex].quest;

      //YES answer
      if (event.target.value === "yes") {
        this.setState(state => ({
          statesList: state.statesList.filter((value) =>
              states[states.findIndex(element => element.name === value)][questionValue]),
        }))

        //NO answer
      } else if (event.target.value === "no") {
        this.setState(state => ({
          statesList: state.statesList.filter((value) =>
              !states[states.findIndex(element => element.name === value)][questionValue]),
        }))

        //DON'T KNOW answer
      } else {
        this.setState(state => ({doNotKnowCounter: state.doNotKnowCounter + 1}));
      }

    //remove used question
    questionsTemp = questionsTemp.filter((value, index) => index !== currentIndex)

    /*///ODTĄD WŁAŚCIWIE
      let nextIndex: number = 0
      let hasTrue: boolean = false;
      let hasFalse: boolean = false;
      let nextStatesList: string[] = this.state.statesList.filter((value, index) => index !== currentIndex)

      ///TO DOPRACOWAĆ W CHUJ XD
    if(questionsTemp.length > 1) {
      //while(!(hasTrue && hasFalse)) {
      for(let i = 0; i < 500; i++ ){
        nextIndex = Math.floor(Math.random() * questionsTemp.length)
        hasTrue = false;
        hasFalse = false;

        nextStatesList.forEach((listState, listIndex) => {
          states.forEach((mainState, mainIndex) => {
            if (listState === mainState.name) {
              if (mainState[questionsTemp[nextIndex].quest] === true) {
                hasTrue = true;
              }
              if (mainState[questionsTemp[nextIndex].quest] === false) {
                hasFalse = true;
              }
              console.log(listState)
              console.log(mainState)
              console.log(hasTrue)
              console.log(hasFalse)
            }
          })
        })
        if(hasTrue && hasFalse) break;

      }
    }
      ///DOTĄD JESY CHUJOWO*/

    //generate next index
    this.setState(({
      questionIndex: Math.floor(Math.random() * questionsTemp.length)
    }))
  }

  handleStopButton() {
    ReactDOM.render(
        <React.StrictMode>
          <TitlePage />
        </React.StrictMode>,
        document.getElementById('root'))
  }

  render() {

    return(
        <div className="content" id="mainApp-content">
          <div id="quest-name">{questionsTemp.length > 0 ? questionsTemp[this.state.questionIndex].name : "----BRAK PYTAŃ---"}</div>
          <button className ="answer-button" id="yes" value="yes" onClick={this.handleAnswer}>YES</button>
          <button className ="answer-button" id="idk" value="idk" onClick={this.handleAnswer}>DON'T KNOW</button>
          <button className ="answer-button" id="no" value="no" onClick={this.handleAnswer}>NO</button>
          <button id="stop-button" onClick={this.handleStopButton}>Can we just stop? I don't want to play anymore..</button>
        </div>
    )
}
}

export default App;
