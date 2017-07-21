//Importing required packages
import React, { Component, PropTypes } from 'react';

//Importing static assets (i.e. stylesheets, images)
import './Footer.css';

//Importing React Components


/**
 * Footer
 */
 class Footer extends Component {
   constructor(props) {
     super(props);
   }

   render() {
     return (
       <h1>{this.props.title}</h1>
     );
   }
 }

 export default Footer;
