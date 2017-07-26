//Importing required packages
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { localSignUp, localSignIn, signOut } from '../../actions/userActions';
import { Row, Grid } from 'react-bootstrap';

//Importing static assets (i.e. stylesheets, images)
import './Landing.css'

//Importing React Components
import Navbar from '../Navbar/Navbar';
import LandingHeader from './LandingHeader/LandingHeader';
import LandingFeatures from './LandingFeatures/LandingFeatures';
import LandingAbout from './LandingAbout/LandingAbout';
import LandingFooter from './LandingFooter/LandingFooter';

/**
 * Landing
 */
export class Landing extends Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <Grid fluid className="landingContainer">
        {/*<h1>LandingPage</h1> */}
        <Row className="nav">
          <Navbar title="Navbar"/>
        </Row>
        <Row className="LHeading">
          <LandingHeader title="LandingHeader" />
        </Row>
        <Row className="LFeatures">
          <LandingFeatures title="LandingFeatures" />
        </Row>
        <Row className="LAbout">
         <LandingAbout title="LandingAbout" />
        </Row>
        <Row className="LFooter">
         <LandingFooter title="LandingFooter" />
        </Row>
      </Grid>

    );
  }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
