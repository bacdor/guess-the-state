import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './App.css';
import states from "./states";
import questions from "./questions";
import './index.css';


const App = () => {
  const [statesList, setStatesList] =
      useState(states.map(value => (value.name)));
  const [questionsList, setQuestionsList] =
      useState(questions.map(value => ({name: value.name, quest: value.quest})))
  const [questionIndex, setQuestionIndex]  =
      useState(Math.floor(Math.random() * questionsList.length));
  const [doNotKnowCounter, setDoNotKnowCounter] =
      useState(0);

  const history = useHistory()

  useEffect(() => {

      console.log(statesList)
      console.log(questionIndex)
      //czy mogę zostawić tu tego leta? Czy tu też lepiej zmienić ?
    //Chodzi o to, ze jeśli wrzucę go do consta modyfikowanego przy pomocy
    //setState, to wtedy muszę go updatować w tym useEffect a to tworzy mi
    //nieskończoną pętlę albo fakt, że ten if* odpala mi się dopiero przy
    //następnej modyfikacji w zależności od tego czy wrzucę do go listy
    //argumentów na który czuły jest useEffect
      let output: string | HTMLElement = ""

      if (statesList.length === 1) {
        output = `I know!!! It's \r ${statesList[0]}`.toUpperCase();
      } else if (doNotKnowCounter >= 3) {
         output = "---IT SEEMS LIKE YOU DON'T REALLY KNOW YOUR STATE---"
      } else if (questionsList.length === 0) {
        output = "---QUESTIONS OUT OF STOCK---";
      } else if (statesList.length === 0) {
        output = "---THERE IS NO STATE THAT MATCHES YOUR ANSWERS---"
      }
      //*ten if
      if (output !== "") {
          history.push("/endPage", { output: output});
      }

  }, [statesList, doNotKnowCounter,]);


  const handleAnswer = (event: React.MouseEvent<HTMLElement>) => {

      //YES answer
      if ((event.target as any).value === "yes") {
        setStatesList(statesList.filter((value) =>
            states[states.findIndex(element => element.name === value)]
                [questionsList[questionIndex].quest]))

        //NO answer
      } else if ((event.target as any).value === "no") {
        setStatesList(statesList.filter((value) =>
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

