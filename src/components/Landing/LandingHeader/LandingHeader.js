//Importing required packages
import React, { Component, PropTypes } from 'react';
import {Col, Grid, Row} from 'react-bootstrap';

//Importing static assets (i.e. stylesheets, images)
import './LandingHeader.css';

//Importing React Components


/**
 * LandingHeader
 */

 class LandingHeader extends Component {
   constructor(props) {
     super(props);
   }

   render() {
     return (


        <div className="headerArt">
             <Col md={12} className="headerArtImg"></Col>
          {/* <Col xs={4} sm={4} md={4} className="panelL"></Col> */}
          {/* <Col xs={4} sm={4} smOffset={0} md={4} className="panelM"></Col> */}
          {/* <Col xs={4} sm={4} md={4} className="panelR"></Col> */}
        </div>
      
     );
   }

 }

 export default LandingHeader;
