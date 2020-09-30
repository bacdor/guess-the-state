import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './App.css';


const TitlePage = () => {
    const navigateToTheApp = () => {
        ReactDOM.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
            document.getElementById('root')
        );
    }

    return (
        <div className="content" id="title-content">
            <h1 className="title-text" id="title">Guess_the_State</h1>
            <button id="start-button" onClick={navigateToTheApp}>Let the game begin!</button>
            <p className="title-text" id="description">This is a simple program that
                will guess any State of U.S. you are thinking about. The only thing
                you need to do is answer the following questions about your state.</p>
        </div>

    )
};

export default TitlePage;