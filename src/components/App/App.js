//Importing required packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';


//Importing static assets (i.e. stylesheets, images)
import 'bootstrap/dist/css/bootstrap.css'; // Bootstrap package CSS
import 'bootstrap/dist/js/bootstrap.js';  // Bootstrap package jQuery
import 'bootstrap/dist/js/bootstrap.min.js'; // Bootstrap package jQuery (minified)
import './App.css';

// Importing Firebase
import firebase from '../../firebase';

//Importing React Components
import Landing from '../Landing/Landing';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';

/**
 * App (React Routes)
 */

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const isSignedIn = this.props.user.isSignedIn;

    return (
      <Router>
        <Switch>
          <Route exact path="/" render= {() => (isSignedIn ? ( <Redirect to="/dashboard"/> ) : ( <Landing/> ))} />
          <Route exact path="/signup" render= {() => (isSignedIn ? ( <Redirect to="/dashboard"/> ) : ( <Signup/> ))} />
          <Route exact path="/login" render= {() => (isSignedIn ? ( <Redirect to="/dashboard"/> ) : ( <Login/> ))} />
          <Route exact path="/dashboard" render= {() => (isSignedIn ? ( <Dashboard/> ) : ( <Redirect to="/login"/> ))} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
