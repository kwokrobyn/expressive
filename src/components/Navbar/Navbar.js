//Importing required packages
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
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

 render() {
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
            <a href="./" className="navbar-brand"></a>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <div className="row">
              <div className="col-md-push-2 col-md-8 col-lg-push-4 col-lg-6">
                <ul className="nav navbar-nav">
                  <li><Link to="/signup" className="col-sm-2 navlink">Signup</Link></li>
                  <li><Link to="/login" className="col-sm-2 navlink">Login</Link></li>
                </ul>{/* /nav narbar-nav */}
              </div>
            </div>
            <div className="row">
              {/* Notification bar */}
            </div>{/* /row */}
          </div>{/* /bs-example-navbar-collapse-1 */}
        </div>{/* container */}
      </nav>{/* navbar navbar-inverse navbar-fixed-top */}
    </div>
   )
 };
};

export default Navbar;
