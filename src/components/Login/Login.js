//Importing required packages
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { localSignIn, socialSignIn, dismissAuthError } from '../../actions/userActions';
import {Grid, Col, form, FormGroup, FormControl, ControlLabel, HelpBlock, Row, Button} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

//Importing static assets (i.e. stylesheets, images)
import './Login.css';
import squareLogo from '../Navbar/logo_v1.png';

//Importing React Components
import Navbar from '../Navbar/Navbar';

// Importing Firebase
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
    if (this.props.user.hasAuthError) {
    }
  }

  socialSignIn = (e) => {
    if (e.target.id === "facebook") {
      this.props.socialSignIn('facebook');
    } else if (e.target.id === "google") {
      this.props.socialSignIn('google');
    }
  }

  dismissError = (e) => {
    e.preventDefault();
    this.props.dismissAuthError();
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col lg={12} md={12} sm={12} xs={12}>
            <Link to="/signup" className="col-sm-2" id="loginsignup-first-Link">
              <button className="btn btn-default loginsignup-first-btn">
              Sign up
              </button>
            </Link>
          </Col>
        </Row>

        <Row>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 logInTitle">
            <a href="/dashboard" className="signup-img">
              <img src={squareLogo}/>
            </a>
            <h1>Log in to your <b>expressive</b> account</h1>
          </div>
        </Row>

        <Row>
          <Col lg={12} md={12} sm={12} xs={12}>
            <form>
             {/* Email */}
              <label className="login-label" htmlFor="">
                {/* <div className="label-text">Email</div> */}
                <input type="email" placeholder="Your email" id="email-signin"/>
              </label>

              {/* Password */}
              <label  className="login-label" htmlFor="">
                {/*<div className="label-text">Password</div>*/}
                <input type="password" placeholder="Your password" id="pwd-signin"/>
              </label>
            </form>
          </Col>
        </Row>

          {/* Submit Button */}
        <Row>
          <Col lg={12} md={12} sm={12} xs={12} className="loginSubmit">
            <a className="submitLogIn" onClick={this.localSignIn}>
              <span className="text">Log in to Dashboard</span>
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

            <Col lg={12} md={12} sm={12} xs={12} className="login-error-message ">
              <h4 className="error-message"           data-content="{this.props.user.errorMessage}">{this.props.user.errorMessage}</h4>
              <svg version="1.1"
                   className="login-error-message"
                   xmlns="http://www.w3.org/2000/svg"
                   viewBox="-10 -10 160.2 160.2"
                   onClick={this.dismissError}>
              <circle className="path circle"
                      fill="none"
                      stroke="#D06079"
                      strokeWidth={6}
                      strokeMiterlimit={10}
                      cx="65.1"
                      cy="65.1"
                      r="62.1"/>
               <line className="path line"
                     fill="none"
                     stroke="#D06079"
                     strokeWidth={6}
                     strokeLinecap="round"
                     strokeMiterlimit={10}
                     x1="34.4" y1="37.9"
                     x2="95.8"
                     y2="92.3"/>
               <line className="path line"
                     fill="none"
                     stroke="#D06079"
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
            {/*<div>
               <div className="error-message">{this.props.user.errorMessage}<Button className="delete-room" onClick={this.dismissError}></Button></div>
             </div>  */}
            {/* Social Sign In */}
            <Row className="socialLogin">
              <div className="social-text">or log in using your Facebook or Google account information:</div>
              <div className="col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4 sicon">
              {/* Facebook */}
                <Col md={6} sm={6} xs={4} className="text-center">
      				      <div className="icon-circle">
      					         <a href="#" className="ifacebook" title="Facebook"><i className="fa fa-facebook" id="facebook" onClick={this.socialSignIn}></i></a>
      				      </div>
               </Col>

               {/* Google + */}
               <Col md={6} sm={6} xs={4} className="text-center">
                    <div className="icon-circle">
                        <a href="#" className="igoogle" title="Google+"><i className="fa fa-google-plus" id="google" onClick={this.socialSignIn}></i></a>
                    </div>
               </Col>

               </div>
             </Row>



        </Grid>
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
    },
    dismissAuthError: () => {
      dispatch(dismissAuthError())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
