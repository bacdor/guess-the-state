import React from 'react';
import {Link} from 'react-router-dom';
import './App.css';

const HomePage = () => {

    return (

        <div className="content" id="home-content">
            <h1 className="home-text" id="title">Guess_the_State</h1>
            <Link to="/App" id="start-link" className="route-link">
                Let the game begin!
            </Link>
            <p className="home-text" id="description">This is a simple program that
                will guess any State of U.S. you are thinking about. The only thing
                you need to do is answer the following questions about your state.</p>
        </div>
    )
};

export default HomePage;
