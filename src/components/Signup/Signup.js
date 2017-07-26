//Importing required packages
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { localSignUp, socialSignIn } from '../../actions/userActions';
import {Grid, Col, form, FormGroup, FormControl, ControlLabel, HelpBlock, Row, Button} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

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
    if (e.target.id === 'facebook') {
      console.log("facebook button clicked");
      this.props.socialSignIn('facebook');
    } else if (e.target.id === "google") {
      console.log("google button clicked");
      this.props.socialSignIn('google');
    }
  }

  render() {
    return (
      <div>
        <Navbar />


        <form>
          <Row>
            <h1 className="signUpTitle">-Sign Up-</h1>
          </Row>

        {/* Name */}
    {/* <Row>
         <Col sm={8} smOffset={2} xs={10} xsOffset={1} className="username">
          <form role="form">
                    <div className="form-group float-label-control">
                        <label for="">Username</label>
                        <input type="email" className="form-control" placeholder="Username" id="name-signup"/>
                    </div>
          </form>
         </Col>
        </Row> */}


        <Row>
           {/* Name */}
            <label htmlFor="">
              <div className="label-text">Name</div>
              <input type="email" placeholder="Name" id="name-signup"/>
            </label>
           {/* Email */}
            <label htmlFor="">
              <div className="label-text">Email</div>
              <input type="email" placeholder="@email" id="email-signup"/>
            </label>

            {/* Password */}
            <label htmlFor="">
              <div className="label-text">Password</div>
              <input type="password" placeholder="Password" id="pwd-signup"/>
            </label>
        </Row>


        {/* Submit Button */}
        <Row>
          <Col className="submitSignUp">
          <a className="submitButton" onClick={this.localSignUp}>
            <span className="text">Sign Up?</span>
            <span className="line -right"></span>
            <span className="line -top"></span>
            <span className="line -left"></span>
            <span className="line -bottom"></span>
          </a>
          </Col>
        </Row>

          {/* Social Sign In */}
          <Row className="socialSignUp">
            <div className="sicon">
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
    localSignUp: (user) => {
      dispatch(localSignUp(user))
    },
    socialSignIn: (platform) => {
      dispatch(socialSignIn(platform))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
