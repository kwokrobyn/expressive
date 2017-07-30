//Importing required packages
import React, { Component, PropTypes } from 'react';
import {Row, Col, Image} from 'react-bootstrap';

//Importing static assets (i.e. stylesheets, images)
import './LandingFooter.css';

//Importing React Components
import Footer from '../../Footer/Footer';

/**
 * Footer
 */
 class LandingFooter extends Component {
   constructor(props) {
     super(props);
   }

   render() {
     return (
       <div id="landing-greater-footer">

      {/* Mission Statement */}
        <Row>

           <Col md={12} className="landing-footer-img">
            {/*<Image src="../images/footerArt.png"/>*/}
            <Col md={4} mdOffset={4} sm={4} smOffset={3} xs={6} xsOffset={3} className="landing-mission-title">
            <h2 id="landing-mission-title">Our Mission</h2>
            </Col>
              <Col md={8} mdOffset={2} sm={8} smOffset={2} xs={8} xsOffset={2}>


                 <p id="landing-mission-paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
              </Col>
           </Col>
        </Row>


        {/* Copyright */}

        <Row>
         <footer>
          <div id="landing-footer-group-left">
            <img src ="../../images/logo_v1.png" id="landing-footer-logo"/>
            <p id="landing-footer-credits">
              expressive 2017 by Bryan, Dionne, Robyn & Woody
            </p>
          </div>
         </footer>
        </Row>

      </div>
     );
   }
 }

 export default LandingFooter;
