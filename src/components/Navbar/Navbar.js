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
      <div className=""></div>
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
