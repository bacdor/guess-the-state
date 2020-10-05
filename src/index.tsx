import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from "./homePage";
import App from './App';
import EndPage from "./endPage";
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

const Main = () => {
    const isUserAuthenticated = true;

    return (
            <div>
                <Router>
                    <div>
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={() => {
                                    return (
                                        isUserAuthenticated ?
                                            <Redirect to="/homePage" /> :
                                            <Redirect to="/App" />
                                    )
                                }}
                            />
                            <Route exact path="/homePage" component={HomePage} />
                            <Route exact path="/App" component={App} />
                            <Route exact path="/endPage" component={EndPage} />
                        </Switch>
                    </div>
                </Router>
            </div>
    );

}


ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();


export default Main;
