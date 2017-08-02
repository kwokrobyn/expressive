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

        <div>

          <div className="div-to-signup">
            <Link to="/signup" className="col-sm-2" id="navbar-first-Link">
              <button className="btn btn-success navbar-first-btn link-to-signup">
              Sign up
              </button>
            </Link>
          </div>

          <div>
            <Row>
              <div className="logInTitle">
                <a href="/dashboard" className="signup-img">
                  <img src={squareLogo}/>
                </a>
                <h1>Log in to your expressive account</h1>
              </div>

            </Row>

          <Row>
            <form>

             {/* Email */}
              <label  className="login-label" htmlFor="">
                {/* <div className="label-text">Email</div> */}
                <input type="email" placeholder="Your email" id="email-signin"/>
              </label>

              {/* Password */}
              <label  className="login-label" htmlFor="">
                {/*<div className="label-text">Password</div>*/}
                <input type="password" placeholder="Your password" id="pwd-signin"/>
              </label>
              </form>
          </Row>

          {/* Submit Button */}
          <Row>
            <Col className="loginSubmit">
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
              <div>
                <div className="error-message">{this.props.user.errorMessage}<Button className="delete-room" onClick={this.dismissError}></Button></div>
              </div>
            }
          </Row>

            {/* Social Sign In */}
            <Row className="socialLogin">
              <div className="social-text">Or, log in with your facebook or google account</div>
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
