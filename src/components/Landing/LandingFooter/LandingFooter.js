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
                 <p id="landing-mission-paragraph">To create a free-of-charge live event audience response and engagement management system to facilitate education and information in forums such as talks, conferences, seminars and classrooms. </p>
              </Col>
           </Col>
        </Row>


        {/* Copyright */}


         <footer>
          <div id="landing-footer-group-left">
            <img src ="../../images/logo_v1.png" id="landing-footer-logo"/>
            <p id="landing-footer-credits">
              <b>expressive</b> is a Q & A management web service created by Robyn Kwok, Bryan Lee, Dionne Phua & Woody See
            </p>
          </div>
          <Col md={4} mdOffset={9} sm={6} smOffset={9} xs={6} xsOffset={6} className="social-icons">
            <p className="follow-us">Fork us on GitHub
            <div className="social-btns">
              <a className="btn github" href="#"><i className="fa fa-github"></i></a>
            </div>


            </p>


          </Col>
         </footer>


      </div>
     );
   }
 }

 export default LandingFooter;
