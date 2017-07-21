//Importing required packages
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

//Importing static assets (i.e. stylesheets, images)
import './LandingPage.css'

//Importing React Components
import Navbar from '../Navbar/Navbar';
import LandingHeader from '../LandingHeader/LandingHeader';
import LandingAbout from '../LandingAbout/LandingAbout';
import Footer from '../Footer/Footer';

/**
 * LandingPage
 */
export class LandingPage extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);
  }

  localSignUp = (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('pwd').value;
    const user = {
                  email: email,
                  password: password
                };
  }

  render() {
    return (

      <div className="container-fluid">
        <h1>LandingPage</h1>
        <Navbar title="Navbar"/>
        <LandingHeader title="LandingHeader" />
        <LandingAbout title="LandingAbout" />
        <Footer title="Footer" />
      </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
