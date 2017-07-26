//Importing required packages
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { deleteUser, updateUser } from '../../actions/userActions';

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

  deleteUser = (e) => {
    e.preventDefault();
    this.props.deleteUser(this.props.user);
  }

  updateUser = (e) => {
    e.preventDefault();
    const displayName = document.getElementById('form-displayName').value;
    const email = document.getElementById('form-email').value;
    const password = document.getElementById('form-newpassword').value;
    if (password == null) {
      const user = {
                    email: email,
                    displayName: displayName
                  };
    } else {
      const user = {
                    email: email,
                    password: password,
                    displayName: displayName
                  };
    }
    this.props.updateUser(user);
  }

  render() {
    console.log(this.props.user);

    return (
      <div className="container-fluid">
        <Navbar pageTitle="Profile Settings"/>

        <form>
          <div className="form-group">
            <label>New name</label>
            <input type="email" className="form-control" id="form-displayName" placeholder="Update name here" defaultValue={this.props.user.displayName}/>
          </div>
          <div className="form-group">
            <label>New email</label>
            <input type="email" className="form-control" id="form-email" placeholder="Update email here" defaultValue={this.props.user.email}/>
          </div>
          <div className="form-group">
            <label>New password</label>
            <input type="password" className="form-control" id="form-newpassword" placeholder="Update password here"/>
          </div>
            <button type="submit" className="btn btn-default" onClick={this.updateUser}>Update user</button>
            <button type="submit" className="btn btn-danger" onClick={this.deleteUser}>Delete user</button>
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
    deleteUser: (user) => {
      dispatch(deleteUser(user))
    },

    updateUser: (user) => {
      dispatch(updateUser(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
