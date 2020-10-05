import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './index.css';

interface LocationState {
    output: string | HTMLElement ;
}

const EndPage = () => {
    const location = useLocation<LocationState>();

    const output = location.state.output;

    return (
        <div className="content" id="end-content">
            <h2 id="output">{output}</h2>
            <Link to="/homePage" id="finish-link" className="route-link">
                That was fun, thank you! Take me back to the title page please.
            </Link>
        </div>
    )
};

export default EndPage;
