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
      <div className="navbar-trial">
      <nav className="navbar navbar-default navbar-doublerow navbar-trans navbar-fixed-top">
        { /* top nav */ }
        <nav className="navbar navbar-top hidden-xs">
          <div className="container">
            { /* left nav top */ }
            <ul className="nav navbar-nav pull-left">
              <li><a href="#"><span className="glyphicon glyphicon-thumbs-up text-white"></span></a></li>
              <li><a href="#"><span className="glyphicon glyphicon-globe text-white"></span></a></li>
              <li><a href="#"><span className="glyphicon glyphicon-pushpin text-white"></span></a></li>
              <li><a href="#"><span className="text-white">QUESTIONS? CALL: <b>+963000000000</b></span></a></li>
            </ul>
            { /* right nav top */ }
            <ul className="nav navbar-nav pull-right">
              <li><a href="#" className="text-white">About Us</a></li>
              <li><a href="#" className="text-white">Contact Us</a></li>
            </ul>
          </div>
          <div className="dividline light-grey"></div>
        </nav>
        { /* down nav */ }
        <nav className="navbar navbar-down">
          <div className="container">
            <div className="flex-container">
              <div className="navbar-header flex-item">
                <div className="navbar-brand" href="#">ALPHAD</div>
              </div>
              <ul className="nav navbar-nav flex-item hidden-xs">
                <li><a href="#">Projects</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">TheTeam</a></li>
              </ul>
              <ul className="nav navbar-nav flex-item hidden-xs pull-right">
                <li><a href="#" className="">offer!</a></li>
              </ul>
              { /* dropdown only moblie */ }
                <div className="dropdown visible-xs pull-right">
                  <button className="btn btn-default dropdown-toggle " type="button" id="dropdownmenu" data-toggle="dropdown">
                    <span className="glyphicon glyphicon-align-justify"></span>
                  </button>
                  <ul className="dropdown-menu">
                    <li><a href="#">Projects</a></li>
                    <li><a href="#">Pricing</a></li>
                    <li><a href="#">TheTeam</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#">contact us</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </nav>
      </div>

      <div className="row">
        <h2 className="col-sm-8">Navbar</h2>
        <Link to="/signup" className="col-sm-2 navlink">Signup</Link>
        <Link to="/login" className="col-sm-2 navlink">Login</Link>
      </div>{ /* row */ }
    </div>
   )
 };
};

export default Navbar;
