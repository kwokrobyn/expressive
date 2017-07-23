//Importing required packages
import React, { Component, PropTypes } from 'react';
import {Row} from 'react-bootstrap';

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
          <div className = "footerImg">
            <p className ="copyright"> © Copyright expressive 2017 <img src ="../../images/logo_v1.png" className="footerLogo"/></p>
          </div>
         </footer>
      </Row>

     );
   }
 }

 export default Footer;
