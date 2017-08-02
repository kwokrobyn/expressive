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
import './App.css';

// Importing Firebase
import firebase from '../../firebase';

//Importing React Components
import Landing from '../Landing/Landing';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import Room from '../Room/Room';
import InitRoom from '../InitRoom/InitRoom';
import Profile from '../Profile/Profile';
import Navbar from '../Navbar/Navbar';

// Import Actions
import { signInSuccess } from '../../actions/userActions';

/**
 * App (React Routes)
 */

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // updates user redux state based on firebase current user
    firebase.auth().onAuthStateChanged((user) => {
      console.log('Auth state changed', user);
        if (user) {
          if (user.isAnonymous == true) {
            console.log('You are Anon');
          } else {
            this.props.dispatch(signInSuccess(user));
          }
        } else {
          console.log('There is no user');
        }
    });
  }

  render() {
    const isSignedIn = this.props.user.isSignedIn;
    const isInRoom = this.props.room.isInRoom;

    return (
      <Router>
        <Switch>
          <Route exact path="/" render= {() => (
            isInRoom ?
              ( <Landing/> ) : (
                isSignedIn ?
                  ( <Landing/> ) : ( <Landing/> )
              )
          )} />
          <Route exact path="/signup" render= {() => (
            isSignedIn ? ( <Redirect to="/dashboard"/> ) : ( <Signup/> )
          )} />
          <Route exact path="/login" render= {() => (
            isSignedIn ? ( <Redirect to="/dashboard"/> ) : ( <Login/> )
          )} />
          <Route exact path="/dashboard" render= {() => (
            isSignedIn ? ( <Dashboard/> ) : ( <Redirect to="/"/> )
          )} />
          <Route path="/profile" render={() => (
            isSignedIn ? ( <Profile/> ) : ( <Redirect to="/"/> )
          )} />
          <Route exact path="/room" render= {() => (
            ( <Redirect to="/"/> )
          )} />
          <Route path="/room/:id" component={InitRoom} />
          <Route component={NoMatch}/>
        </Switch>
      </Router>
    );
  }
}

// No Match Component for deadlinks
const NoMatch = ({ location }) => (
  <div className="errorpage">
  <Navbar />
    <h2 className="error-text"><b>404</b>: Your Princess Is In Another Castle.</h2>
    <h3 className="nomatch-text">No match for <code>{location.pathname}</code></h3>
    <div className="errorpage-img"></div>
  </div>
)

const mapStateToProps = (state) => {
    return {
      user: state.user,
      room: state.room
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
