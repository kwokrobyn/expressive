//Importing required packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

//Importing static assets (i.e. stylesheets, images)
import './App.css';


// Importing Firebase

import firebase from '../../firebase';

//Importing React Components
import Landing from '../Landing/Landing';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';

/**
 * App (React Routes)
 */

class App extends Component {


  constructor(props) {
    super(props);
  }


  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default App;
