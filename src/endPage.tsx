import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TitlePage from './titlePage';


const EndPage = (output: JSX.Element) => {
    const navigateToTheTitlePage = () => {
        ReactDOM.render(
            <React.StrictMode>
                <TitlePage />
            </React.StrictMode>,
            document.getElementById('root')
        );
    }

    return (
        <div className="content" id="end-content">
            <h2 id="output">{output.props}</h2>
            <button id="finish-game1" onClick={navigateToTheTitlePage}>That was fun, thank you! Take me back to the title page please.</button>
        </div>
    )
};

export default EndPage;