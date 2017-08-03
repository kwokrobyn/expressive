//Importing required packages
import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

//Importing static assets (i.e. stylesheets, images)
import './LandingFooter.css';

//Importing React Components

 class LandingFooter extends Component {
   render() {
     return (
       <div id="landing-greater-footer">
      {/* Mission Statement */}
          <Col md={8} mdOffset={2} sm={8} smOffset={2} xs={8} xsOffset={2}>

          </Col>
           <div className="landing-footer-img">
           <div id="landing-mission-title">Our Mission</div>
             <p id="landing-mission-paragraph">To create a free-of-charge live event audience response and engagement management system to facilitate education and information in forums such as talks, conferences, seminars and classrooms. </p>
           </div>

            {/*<Image src="../images/footerArt.png"/>*/}

        {/* Copyright */}

         <footer>
          <div id="landing-footer-group-left">
            <img src ="../../images/logo_v1.png" id="landing-footer-logo" alt="logo"/>
            <p id="landing-footer-credits">
              <b>expressive</b> is a Q & A management web service created by Robyn Kwok, Bryan Lee, Dionne Phua & Woody See
            </p>
          </div>
          <Col md={4} mdOffset={9} sm={6} smOffset={9} xs={6} xsOffset={6} className="social-icons">
            <p className="follow-us">Fork us on GitHub</p>
            <div className="social-btns">
              <a className="btn github" href="https://github.com/kwokrobyn/expressive"><i className="fa fa-github"></i></a>
            </div>

          </Col>
         </footer>

      </div>
     );
   }
 }

 export default LandingFooter;
