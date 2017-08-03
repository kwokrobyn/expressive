//Importing required packages
import React, { Component } from 'react';
import {Col, Row} from 'react-bootstrap';

//Importing static assets (i.e. stylesheets, images)
import './LandingHeader.css';

//Importing React Components

class LandingHeader extends Component {
  render() {
    return (
      <div>
         <div className="headerArt">
           <Col md={12} className="headerArtImg">
           </Col>
         </div>
         {/* Header Title */}
        <Row className="interactive-header-title">
        <div className="content">
          <div className="content__container">
            <p className="content__container__text">
              Interactive
            </p>
            {/* Header Title content*/}
            <ul className="content__container__list">
              <li className="content__container__list__item">Q and A !</li>
              <li className="content__container__list__item">People !</li>
              <li className="content__container__list__item">Votes !</li>
              <li className="content__container__list__item">Rooms !</li>
            </ul>
          </div>
        </div>
        </Row>
      </div>
     );
   }
 }

 export default LandingHeader;
