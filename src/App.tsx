import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './App.css';
import states from "./states";
import questions from "./questions";
import './index.css';


const App = () => {
  const [stateNameList, setStateNameList] =
      useState(states.map(value => (value.name)));
  const [questionsList, setQuestionsList] =
      useState(questions.map(value => ({name: value.name, quest: value.quest})))
  const [questionIndex, setQuestionIndex]  =
      useState(Math.floor(Math.random() * questionsList.length));
  const [doNotKnowCounter, setDoNotKnowCounter] =
      useState(0);

  const history = useHistory()

  useEffect(() => {

      console.log(stateNameList)
      console.log(questionIndex)

      const getOutputMessage = (): string | HTMLElement => {
          if (stateNameList.length === 1) {
              return `I know!!! It's \r ${stateNameList[0]}.toUpperCase()`;
          } else if (doNotKnowCounter >= 3) {
              return "---IT SEEMS LIKE YOU DON'T REALLY KNOW YOUR STATE---";
          } else if (questionsList.length === 0) {
              return "---QUESTIONS OUT OF STOCK---";
          } else if (stateNameList.length === 0) {
              return "---THERE IS NO STATE THAT MATCHES YOUR ANSWERS---";
          }
          return "";
      }

      if (getOutputMessage() !== "") {
          history.push("/endPage", { output: getOutputMessage});
      }

  }, [stateNameList, doNotKnowCounter,]);


  const handleAnswer = (event: React.MouseEvent<HTMLElement>) => {

      //YES answer
      if ((event.target as any).value === "yes") {
          setStateNameList(stateNameList.filter((value) =>
            states[states.findIndex(element => element.name === value)]
                [questionsList[questionIndex].quest]))

        //NO answer
      } else if ((event.target as any).value === "no") {
          setStateNameList(stateNameList.filter((value) =>
            !states[states.findIndex(element => element.name === value)]
                [questionsList[questionIndex].quest]))

        //DON'T KNOW answer
      } else {
        setDoNotKnowCounter(doNotKnowCounter + 1);
      }

    //remove used question
    setQuestionsList(questionsList.filter((value, index) => index !== questionIndex))

    //generate next index
    setQuestionIndex(Math.floor(Math.random() * (questionsList.length - 1)))

  }

    return(
        <div className="content" id="mainApp-content">
          <div id="quest-name">{questionsList[questionIndex].name}</div>
          <button className ="answer-button" id="yes" value="yes" onClick={handleAnswer}>YES</button>
          <button className ="answer-button" id="idk" value="idk" onClick={handleAnswer}>DON'T KNOW</button>
          <button className ="answer-button" id="no" value="no" onClick={handleAnswer}>NO</button>
          <Link to="/homePage" id="stop-link" className="route-link">
              Can we just stop? I don't want to play anymore..
          </Link>
        </div>
    )
}

export default App;
