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
import squareLogo from './logo_v1.png';
import titledLogo from './logo_v1.png';

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

   let profileElement = null;
    if (isSignedIn) {

      /* Navbar unordered list of buttons if user is LOGGED IN */
      profileElement = (
        <ul className="nav navbar-nav" id="navbar-list">
          <li>
            <button className="btn btn-success signup-btn">
              <Link to="/profile" className="col-sm-2 navlink">
                {this.props.user.displayName}
              </Link>
            </button>
          </li>
          <li>
            <button className="btn btn-success middle-btn">
              <Link to="/dashboard" className="col-sm-2">
                Dashboard
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
      profileElement = (
         <ul className="nav navbar-nav" id="navbar-list">
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

      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="container navContainer">
          <div className="navbar-header">
            <a href="./" className="navbar-brand">
              <img src={squareLogo}/>
            </a>

            <button type="button"
                    className="navbar-toggle"
                    data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              {/*Three Icon Bars in mobile displays*/}
              <span className="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <div className="row">
              <div className="col-sm-6 col-md-7 col-lg-8 navbar-header-fix">
                <div className="navbar-header" id="navbar-header-md-lg">
                  <a href="./" className="navbar-brand">
                    <img src={titledLogo}/>
                  </a>
                </div>
                <div className="pageTitle">{this.props.pageTitle}</div>
              </div>
              <div className="col-sm-6 col-md-5 col-lg-4">
                {profileElement}
              </div>
            </div>
            <div className="row">
              {/* Notification bar - if any */}
            </div>{/* /row */}
          </div>{/* /bs-example-navbar-collapse-1 */}
        </div>{/* container */}
      </nav>
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
