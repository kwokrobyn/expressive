//Importing required packages
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { localSignIn, socialSignIn } from '../../actions/userActions';
import {Grid, Col, form, FormGroup, FormControl, ControlLabel, HelpBlock, Row, Button} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

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
    e.preventDefault();
    if (e.target.classList.contains("facebook")) {
      this.props.socialSignIn('facebook');
    } else if (e.target.classList.contains("google")) {
      this.props.socialSignIn('google');
    }
  }




  render() {
    return (

        <div>
          <Navbar pageTitle="Log In"/>

          <form>
            <Row>
              <h1 className="logInTitle">-Log In-</h1>
            </Row>

          <Row>
             {/* Email */}
              <label for="">
                <div className="label-text">Email</div>
                <input type="email" placeholder="@email" id="email-signup"/>
              </label>

              {/* Password */}
              <label for="">
                <div class="label-text">Password</div>
                <input type="password" placeholder="Password" id="pwd-signup"/>
              </label>
          </Row>

          {/* Submit Button */}
          <Row>
            <Col className="loginSubmit">
            <a className="submitLogIn" onClick={this.localSignIn}>
              <span className="text">Log In?</span>
              <span className="line -right"></span>
              <span className="line -top"></span>
              <span className="line -left"></span>
              <span className="line -bottom"></span>
            </a>
            </Col>
          </Row>


            {/* Social Sign In */}
            <Row className="socialLogin">
              <button type="submit" className="btn btn-default facebook" onClick={this.socialSignIn}>Facebook</button>
              <button type="submit" className="btn btn-default google" onClick={this.socialSignIn}>Google</button>
             </Row>

          </form>
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
