//Importing required packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { localSignUp, socialSignIn, dismissAuthError } from '../../actions/userActions';
import {Col, form, Row, Button} from 'react-bootstrap';
import {
  Link
} from 'react-router-dom';

//Importing static assets (i.e. stylesheets, images)
import './Signup.css';

//Importing React Components

// Import Firebase
import firebase from '../../firebase';

import squareLogo from '../Navbar/logo_v1.png';

class Signup extends Component {
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
              <img src={squareLogo} alt="squareLogo"/>
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
          <Row className="signup-error-message-row">

          {this.props.user.hasAuthError &&

            <Col lg={12} md={12} sm={12} xs={12} className="signup-error-message-group">
              <h4 className="signup-error-message"           data-content="{this.props.user.errorMessage}">{this.props.user.errorMessage}</h4>
              <svg version="1.1"
                   className="signup-error-message-svg"
                   xmlns="http://www.w3.org/2000/svg"
                   viewBox="-10 -10 160.2 160.2"
                   onClick={this.dismissError}>
              <circle className="path circle"
                      fill="none"
                      stroke="#e04242"
                      strokeWidth={6}
                      strokeMiterlimit={10}
                      cx="65.1"
                      cy="65.1"
                      r="62.1"/>
               <line className="path line"
                     fill="none"
                     stroke="#e04242"
                     strokeWidth={6}
                     strokeLinecap="round"
                     strokeMiterlimit={10}
                     x1="34.4" y1="37.9"
                     x2="95.8"
                     y2="92.3"/>
               <line className="path line"
                     fill="none"
                     stroke="#e04242"
                     strokeWidth={6}
                     strokeLinecap="round"
                     strokeMiterlimit={10}
                     x1="95.8"
                     y1={38}
                     x2="34.4"
                     y2="92.2"/>
              </svg>
            </Col>
          }
          </Row>

          {/* Social Sign In */}
          <Row className="socialSignUp">
            <div className="social-text">or log in using your Facebook or Google account information:</div>
            <div className="col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4 sicon">
            {/* Facebook */}
              <Col md={6} sm={6} xs={4} className="text-center">
    				      <div className="icon-circle">
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
