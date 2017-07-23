//Importing required packages
import React, { Component, PropTypes } from 'react';
import {Row, Col} from 'react-bootstrap';

//Importing static assets (i.e. stylesheets, images)
import './LandingFooter.css';

//Importing React Components

/**
 * Footer
 */
 class LandingFooter extends Component {
   constructor(props) {
     super(props);
   }

   render() {
     return (
       <div className="footer">

      {/* Mission Statement */}
        <Row>
           <Col md={8} mdOffset={2} sm={8} smOffset={2} xs={8} xsOffset={2}>
             <h2 className="MissionTitle">-Our Mission-</h2>
              <p className="Mission">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
           </Col>
        </Row>

        {/* Copyright */}
        <Row>
         <footer>
          <div className = "footerImg">
            <p className ="copyright"> © Copyright expressive 2017 <img src ="../../images/logo_v1.png" className="footerLogo"/></p>
          </div>
         </footer>
        </Row>
      </div>
     );
   }
 }

 export default LandingFooter;
