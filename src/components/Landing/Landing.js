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

  // localSignUp = (e) => {
  //   e.preventDefault();
  //   const email = document.getElementById('email-signup').value;
  //   const password = document.getElementById('pwd-signup').value;
  //   const name = document.getElementById('name-signup').value;
  //   const user = {
  //                 email: email,
  //                 password: password,
  //                 name: name
  //               };
  //   this.props.localSignUp(user);
  // }
  //
  // localSignIn = (e) => {
  //   e.preventDefault();
  //   const email = document.getElementById('email-signin').value;
  //   const password = document.getElementById('pwd-signin').value;
  //   const user = {
  //                 email: email,
  //                 password: password
  //   };
  //   this.props.localSignIn(user);
  // }

  // signOut = (e) => {
  //   e.preventDefault();
  //   this.props.signOut();
  // }

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
    // localSignUp: (user) => {
    //   dispatch(localSignUp(user))
    // },
    // localSignIn: (user) => {
    //   dispatch(localSignIn(user))
    // },
    // signOut: () => {
    //   dispatch(signOut())
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
