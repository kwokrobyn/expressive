//Importing required packages
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

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
     <h2>{this.props.title}</h2>
   )
 };
};

export default Navbar;
