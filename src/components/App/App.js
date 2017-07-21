import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

// Static Files
import logo from '../../logo.svg';
import './App.css';

// Firebase 
import firebase from '../../firebase';

// Components
import Landing from '../Landing/Landing';


class App extends Component {



  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Landing}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
