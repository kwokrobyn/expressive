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
       <div>
         <div className="headerArt">
           <Col md={12} className="headerArtImg">
           </Col>
         </div>

        <h1 className="header-title">Interactive Q and A</h1>


        </div>

     );
   }

 }

 export default LandingHeader;
