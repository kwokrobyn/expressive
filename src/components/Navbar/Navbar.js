//Importing required packages
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../actions/userActions';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

//Importing static assets (i.e. stylesheets, images)
import './Navbar.css';

//Importing React Components

/**
 * Navbar
 */
class Navbar extends Component {
 constructor(props) {
   super(props);
 };

 signOut = (e) => {
   e.preventDefault();
   this.props.signOut();
 }

 render() {
   const isSignedIn = this.props.user.isSignedIn;

   let profileEle = null;
    if (isSignedIn) {
      profileEle = (
        <ul className="nav navbar-nav">
          <li>
            <button className="btn btn-success signup-btn">
              <Link to="/profile" className="col-sm-2 navlink">
                Profile
              </Link>
            </button>
          </li>
          <li>
            <button type="submit" className="btn btn-default login-btn" onClick={this.signOut}>
              <Link to="/login" className="col-sm-2 navlink">
                Log Out
              </Link>
            </button>
          </li>
        </ul>
      )
    } else { // not signedin
      profileEle = (
        <ul className="nav navbar-nav">
          <li>
            <button className="btn btn-success signup-btn">
              <Link to="/signup" className="col-sm-2 navlink">
                Sign Up
              </Link>
            </button>
          </li>
          <li>
            <button className="btn btn-default login-btn">
              <Link to="/login" className="col-sm-2 navlink">
                Log In
              </Link>
            </button>
          </li>
        </ul>
      )
    }

   return (
    <div className="container">
      <nav className="navbar navbar-inverse navbar-fixed-top"     role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              {/*Three Icon Bars in mobile displays*/}
              <span className="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
            </button>
            <a href="./" className="navbar-brand">expressive</a>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <div className="row">
              <div className="col-sm-7 col-md-8 col-lg-9"></div>
              <div className="col-sm-push-7 col-sm-5 col-md-push-8 col-md-4 col-lg-push-9 col-lg-3">
                {profileEle}
              </div>
            </div>
            <div className="row">
              {/* Notification bar - if any */}
            </div>{/* /row */}
          </div>{/* /bs-example-navbar-collapse-1 */}
        </div>{/* container */}
      </nav>{/* navbar navbar-inverse navbar-fixed-top */}
    </div>
   )
 };
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => {
      dispatch(signOut())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
