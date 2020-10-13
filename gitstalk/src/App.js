import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom'
import FrontCpt from './frontCpt/frontCpt'
import InfoCpt from './infoCpt/infoCpt'
import './App.css';

function App() {
    return(
        <div id="app">
            <Router>
                <div>
                    <Route path="/" component={FrontCpt}/>
                    <Route path="/info" component={InfoCpt}/>
                </div>
            </Router>
        </div>
    )
}

export default App;
