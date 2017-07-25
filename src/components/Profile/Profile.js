//Importing required packages
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { localSignIn, signOut, socialSignIn } from '../../actions/userActions';

//Importing static assets (i.e. stylesheets, images)
import './Profile.css';

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


  localUserDelete = (e) => {
    e.preventDefault();
    const email = document.getElementById('profile-form-email').value;
    const password = document.getElementById('profile-form-newpassword').value;
    const user = {
                  email: email,
                  password: password
    };
  }

  render() {
    console.log(this.props.user);

    return (
      <div className="container-fluid">
        <Navbar />
        <h1>Editing {this.props.user.displayName}s profile</h1>

        <form>
          <div className="form-group">
            <label>New name</label>
            <input type="email" className="form-control" id="profile-form-displayName" placeholder="Update name here" defaultValue={this.props.user.displayName}/>
          </div>
          <div className="form-group">
            <label>New email</label>
            <input type="email" className="form-control" id="profile-form-email" placeholder="Update email here" defaultValue={this.props.user.email}/>
          </div>
          <div className="form-group">
            <label>New password</label>
            <input type="password" className="form-control" id="profile-form-newpassword" placeholder="Update password here"/>
          </div>
            <button type="submit" className="btn btn-default">Update user details</button>
            <button type="submit" className="btn btn-danger">Delete user</button>
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
