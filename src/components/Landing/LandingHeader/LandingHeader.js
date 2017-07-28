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
        {/* <Col md={12} className="social-icons-header">
          <ul className="social-network social-circle">
               <li>
                   <a href="#" className="icoGithub" title="Rss"><i className="fa fa-github"></i></a>
               </li>
               <li>
                   <a href="#" className="icoFacebook" title="Facebook"><i className="fa fa-facebook"></i></a>
               </li>
               <li>
                   <a href="#" className="icoTwitter" title="Twitter"><i className="fa fa-twitter"></i></a>
               </li>
               <li>
                   <a href="#" className="icoGoogle" title="Google +"><i className="fa fa-google-plus"></i></a>
               </li>
               <li>
                   <a href="#" className="icoLinkedin" title="Linkedin"><i className="fa fa-linkedin"></i></a>
               </li>
          </ul>
         </Col> */}


         <Col md={12} mdOffset={3} xs={6} xsOffset={3} className="social-icons">
         <div className="social-btns">
           <a className="btn facebook" href="#"><i className="fa fa-facebook"></i></a>
           <a className="btn twitter" href="#"><i className="fa fa-twitter"></i></a>
           <a className="btn google" href="#"><i className="fa fa-google"></i></a>
           <a className="btn linkedin" href="#"><i className="fa fa-linkedin"></i></a>
           <a className="btn github" href="#"><i className="fa fa-github"></i></a>
         </div>
         </Col>
        </div>

     );
   }

 }

 export default LandingHeader;
