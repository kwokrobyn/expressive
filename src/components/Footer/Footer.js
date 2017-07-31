//Importing required packages
import React, { Component, PropTypes } from 'react';
import {Row, Col} from 'react-bootstrap';

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
       <Row>
         <footer>
          <div id="footer-group-left">
            <img src ="../../images/logo_v1.png" id="footer-logo"/>
            <p id="footer-credits">
              <b>expressive</b> by Bryan Lee, Dionne Phua, Robyn Kwok & Woody See
            </p>
          </div>
         </footer>
       </Row>
     );
   }
 }

 export default Footer;
