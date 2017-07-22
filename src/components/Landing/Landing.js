//Importing required packages
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { localSignUp, localSignIn, signOut } from '../../actions/userActions';

//Importing static assets (i.e. stylesheets, images)
import './Landing.css'

//Importing React Components
import Navbar from '../Navbar/Navbar';
import LandingHeader from './LandingHeader/LandingHeader';
import LandingAbout from './LandingAbout/LandingAbout';
import Footer from '../Footer/Footer';

/**
 * Landing
 */
export class Landing extends Component {

  constructor(props){
    super(props)
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

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
