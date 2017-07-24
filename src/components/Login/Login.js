//Importing required packages
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { localSignIn, socialSignIn } from '../../actions/userActions';

//Importing static assets (i.e. stylesheets, images)
import './Login.css';

//Importing React Components
import Navbar from '../Navbar/Navbar';

// Import Firebase
import firebase from '../../firebase';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this is test code to see if there is firebase user
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        console.log('There is a user in firebase', user);
      } else {
        console.log('There is no user in firebase', user);
      }
    });
  } // end of test code

  localSignIn = (e) => {
    e.preventDefault();
    const email = document.getElementById('email-signin').value;
    const password = document.getElementById('pwd-signin').value;
    const user = {
                  email: email,
                  password: password
    };
    this.props.localSignIn(user);
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
        <h1>Login</h1>
        <Navbar />
        <form>
          <div className="form-group">
            <label htmlFor="email">Email address:</label>
            <input type="email" className="form-control" id="email-signin" />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input type="password" className="form-control" id="pwd-signin" />
          </div>
          <button type="submit" className="btn btn-default" onClick={this.localSignIn}>Sign In</button>
        </form>

        <button type="submit" className="btn btn-default" onClick={this.socialSignIn}>Facebook</button>
        <button type="submit" className="btn btn-danger" onClick={this.socialSignIn}>Google</button>

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

    localSignIn: (user) => {
      dispatch(localSignIn(user))
    },
    socialSignIn: (platform) => {
      dispatch(socialSignIn(platform))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
