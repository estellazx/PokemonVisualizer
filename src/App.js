import React, { Component } from 'react';
import './App.css';
import Main from './Main.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TypePage from './typePage.js';

class App extends Component {
  
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Main} />
                    <Route path="/type/:type" component={TypePage} />
                </div>
            </Router>
        );
    }
}

export default App;
