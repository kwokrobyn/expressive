//Importing required packages
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { localSignIn, signOut, socialSignIn } from '../../actions/userActions';

//Importing static assets (i.e. stylesheets, images)

//Importing React Components
import Navbar from '../Navbar/Navbar';

// Import Firebase
import firebase from '../../firebase';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this is test code to see if there is firebase user
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        console.log('There is a user in firebase', user);
      } else {
        console.log('There is no user in firebase', user);
      }
    });
  } // end of test code

  render() {
    console.log(this.props.user);

    return (
      <div className="container-fluid">
        <Navbar />
        <h1>Profile</h1>
        <form>
        Name<input defaultValue={this.props.user.displayName}/>
        <br />
        Email<input defaultValue={this.props.user.email}/>
        </form>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    localSignIn: (user) => {
      dispatch(localSignIn(user))
    },
    signOut: () => {
      dispatch(signOut())
    },
    socialSignIn: (platform) => {
      dispatch(socialSignIn(platform))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
