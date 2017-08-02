//Importing required packages
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { localSignUp, socialSignIn, dismissAuthError } from '../../actions/userActions';
import {Grid, Col, form, FormGroup, FormControl, ControlLabel, HelpBlock, Row, Button} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

//Importing static assets (i.e. stylesheets, images)
import './Signup.css';

//Importing React Components
import Navbar from '../Navbar/Navbar';

// Import Firebase
import firebase from '../../firebase';

import squareLogo from '../Navbar/logo_v1.png';

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
    if (e.target.id === 'facebook') {
      console.log("facebook button clicked");
      this.props.socialSignIn('facebook');
    } else if (e.target.id === "google") {
      console.log("google button clicked");
      this.props.socialSignIn('google');
    }
  }

  dismissError = (e) => {
    e.preventDefault();
    this.props.dismissAuthError();
  }

  render() {
    return (
      <div className="row">

        <Link to="/login" className="col-sm-2" id="loginsignup-first-Link">
          <button className="btn btn-default loginsignup-first-btn">
            Log in
          </button>
        </Link>


        <div>
          <Row>
            <div className="signUpTitle">
            <a href="/dashboard" className="signup-img">
              <img src={squareLogo}/>
            </a>
              <div><h1>Sign up for your free <b>expressive</b> account</h1></div>
              <div><p>Use <b>expressive</b> and all of its features for free, forever!</p></div>
            </div>
          </Row>

        <Row>
          <form>
           {/* Name */}
            <label className="signup-label firstsignup-label" htmlFor="">
            {/*<div className="label-text">Name</div> */}

              <input type="email" maxLength="20" placeholder="Full name" id="name-signup"/>

            </label>
           {/* Email */}
            <label className="signup-label" htmlFor="">
            {/*  <div className="label-text">Email</div> */}

              <input type="email" maxLength="30" placeholder="Your email" id="email-signup"/>

            </label>

            {/* Password */}
            <label className="signup-label" htmlFor="">
              {/* <div className="label-text">Password</div> */}

              <input type="password" maxLength="30" placeholder="Set a password" id="pwd-signup"/>

            </label>

          </form>
        </Row>


        {/* Submit Button */}
          <Row>
            <Col className="submitSignUp">
            <a className="submitButton" onClick={this.localSignUp} type="submit">
              <span className="text">Create Account</span>
              <span className="line -right"></span>
              <span className="line -top"></span>
              <span className="line -left"></span>
              <span className="line -bottom"></span>
            </a>
            </Col>
          </Row>

          {/* Error Message */}
          <Row>
            {this.props.user.hasAuthError &&
              <div>
                <div className="error-message">{this.props.user.errorMessage}<Button className="delete-room" onClick={this.dismissError}></Button></div>
              </div>
            }
          </Row>

          {/* Social Sign In */}
          <Row className="socialSignUp">
            <div className="social-text">or log in using your Facebook or Google account information:</div>
            <div className="col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4 sicon">
            {/* Facebook */}
              <Col md={6} sm={6} xs={4} className="text-center">
    				      <div className="icon-circle" >
    					         <a href="#" className="ifacebook"><i className="fa fa-facebook" id="facebook" onClick={this.socialSignIn}></i></a>
    				      </div>
              </Col>

             {/* Google + */}
              <Col md={6} sm={6} xs={4} className="text-center">
                  <div className="icon-circle">
                      <a href="#" className="igoogle"><i className="fa fa-google-plus" id="google" onClick={this.socialSignIn}></i></a>
                  </div>
              </Col>

             </div>
           </Row>

        </div>
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
    socialSignIn: (platform) => {
      dispatch(socialSignIn(platform))
    },
    dismissAuthError: () => {
      dispatch(dismissAuthError())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
