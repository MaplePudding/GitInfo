import React from 'react';
import {HashRouter as Router, Redirect, Route} from 'react-router-dom'
import FrontCpt from './frontCpt/frontCpt'
import InfoCpt from './infoCpt/infoCpt'
import './App.css';

function App() {
    return(
        <div id="app">
            <Router>
                <div>
                    <Route path="/front" component={FrontCpt}/>
                    <Route path="/info" component={InfoCpt}/>
                    <Route path="/" component={FrontCpt} exact/>
                </div>
            </Router>
        </div>
    )
}

export default App;
