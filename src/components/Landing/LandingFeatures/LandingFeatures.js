//Importing required packages
import React, { Component, PropTypes } from 'react';
import {Grid, Col, form, FormGroup, FormControl, ControlLabel, HelpBlock, Row, Button} from 'react-bootstrap';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

//Importing static assets (i.e. stylesheets, images)
import './LandingFeatures.css';

//Importing React Components


class LandingFeatures extends Component {
  constructor(props) {
    super(props);

    this.state = {
        value: '',
        joinroom: ""
        }
  }


  onChange = (e) => {
    let value = e.target.value;
    this.setState({joinroom: value});
    console.log(this.state.joinroom);
  }

  render() {
    return (
      <Grid fluid>

      {/* Join Room Url */}
       <Row className="url-row">
          <div className="landingfeatures-join-rm">
           <FormGroup>
             <ControlLabel className="joinRmLabel">Join A Room</ControlLabel>
             <FormControl
               type="text"
               placeholder="Enter Room URL"
               className="joinRmInput"
               id="joinroom"
               onChange={this.onChange}
               value ={this.state.joinroom}
             />
            {/* Join Room Button */}
              <Link to={"/room/" + this.state.joinroom}>
                <div className="joinroom-button">Join Room</div>
              </Link>
           </FormGroup>
           </div>
        </Row>

        {/* How to Use Title */}


          <div className="how-card">
            <h1 className="how-title">
            How to use
            </h1>
          </div>



        {/* Featurettes */}
        <Row>
          <div className="featurettes">
          {/* make xs stack on top of each other when scaling responsively */}
            <Col md={4} xs={12} className="featureFrame01">
              <div className="features01">About</div>
            </Col>
            <Col md={4} xs={12} className="featureFrame02">
              <div className="features02">Feature</div>
            </Col>
            <Col md={4} xs={12} className="featureFrame03">
              <div className="features03">Hello</div>
            </Col>
          </div>
        </Row>

      </Grid>

    );
  }

}

export default LandingFeatures;
