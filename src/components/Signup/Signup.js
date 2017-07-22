//Importing required packages
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { localSignUp, signOut, socialSignIn } from '../../actions/userActions';

//Importing static assets (i.e. stylesheets, images)
import './Signup.css';

//Importing React Components
import Navbar from '../Navbar/Navbar';

// Import Firebase
import firebase from '../../firebase';

class Signup extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        console.log('There is a user in firebase', user);
      } else {
        console.log('There is no user in firebase', user);
      }
    });
  }

  localSignUp = (e) => {
    e.preventDefault();
    const email = document.getElementById('email-signup').value;
    const password = document.getElementById('pwd-signup').value;
    const displayName = document.getElementById('name-signup').value;
    const user = {
                  email: email,
                  password: password,
                  displayName: displayName
                };
    this.props.localSignUp(user);
  }

  socialSignIn = (e) => {
    if (e.target.classList.contains("facebook")) {
      this.props.socialSignIn('facebook');
    } else if (e.target.classList.contains("google")) {
      this.props.socialSignIn('google');
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <h1>Signup</h1>
        <Navbar />
        <form>
          <div className="form-group">
            <label htmlFor="email">Email address:</label>
            <input type="email" className="form-control" id="email-signup" />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input type="password" className="form-control" id="pwd-signup" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Name:</label>
            <input type="email" className="form-control" id="name-signup" />
          </div>
          <button type="submit" className="btn btn-default" onClick={this.localSignUp}>Sign Up</button>
        </form>

        <button type="submit" className="btn btn-default facebook" onClick={this.socialSignIn}>Facebook</button>
        <button type="submit" className="btn btn-default google" onClick={this.socialSignIn}>Google</button>

      </div>

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
    localSignUp: (user) => {
      dispatch(localSignUp(user))
    },
    signOut: () => {
      dispatch(signOut())
    },
    socialSignIn: (platform) => {
      dispatch(socialSignIn(platform))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
