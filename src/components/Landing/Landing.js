//Importing required packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Grid } from 'react-bootstrap';

//Importing static assets (i.e. stylesheets, images)
import './Landing.css'

//Importing React Components
import Navbar from '../Navbar/Navbar';
import LandingHeader from './LandingHeader/LandingHeader';
import LandingFeatures from './LandingFeatures/LandingFeatures';
import LandingAbout from './LandingAbout/LandingAbout';
import LandingFooter from './LandingFooter/LandingFooter';

import firebase from 'firebase';

/**
 * Landing
 */
export class Landing extends Component {
  componentDidMount() {

    if (this.props.user.isSignedIn) {

    } else {
      firebase.auth().signInAnonymously().then(() => {

      })
      .catch((error) => {
        console.log('Anonymous Sign In Failed: ', error.message);
        window.location.href = '/';
      })
    }
  }

  render() {
    return (
      <Grid fluid className="landingContainer">
        <Row className="nav">
          <Navbar pageTitle="expressive" title="Navbar"/>
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
    user: state.user,
    fetchState: state.isFetching,
    room: state.room
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
