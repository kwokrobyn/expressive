//Importing required packages
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Col, Button, Row } from 'react-bootstrap';
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
    let user;
    if (password == null) {
     user = {
                    email: email,
                    displayName: displayName
                  };
    } else {
     user = {
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
      <Grid fluid>
        <Navbar pageTitle="Profile Settings"/>

      {/*  <form id="profile-form">

          <div className="form-group">
            <label>New name</label>
            <input  type="email"
                    className="form-control"
                    id="form-displayName"
                    placeholder="Update name here" defaultValue={this.props.user.displayName}/>
          </div>
          <div className="form-group">
            <label>New email</label>
            <input  type="email"
                    className="form-control"
                    id="form-email"
                    placeholder="Update email here" defaultValue={this.props.user.email}/>
          </div>
          <div className="form-group">
            <label>New password</label>
            <input  type="password"
                    className="form-control"
                    id="form-newpassword"
                    placeholder="Update password here"/>
          </div> */}

          <div className="update-profile">

          <Col md={12} className="update-profile_form">
          <h2>Profile settings</h2>
          </Col>


           <Col md={12} className="update-profile_form">
            <span className="input input--update">
					       <input className="input__field input__field--update"
                        type="text"
                        id="form-displayName"
                        maxLength={16}
                        defaultValue={this.props.user.displayName}/>
  					<label className="input__label input__label--update" htmlFor="form-displayName">
  						<span className="input__label-content input__label-content--update">Update First Name Here</span>
  					</label>
  				</span>
          </Col>

          <Col md={12} className="update-profile_form">
  				<span className="input input--update">
  					<input className="input__field input__field--update"
                   type="email"
                   id="form-email"
                   maxLength={16}
                   defaultValue={this.props.user.email}/>
  					<label className="input__label input__label--update" htmlFor="form-email">
  						<span className="input__label-content input__label-content--update">Update email here</span>
  					</label>
  				</span>
          </Col>

          <Col md={12} className="update-profile_form">
  				<span className="input input--update">
  					<input className="input__field input__field--update"
                   type="password"
                   maxLength={16}
                   id="form-newpassword" />
  					<label className="input__label input__label--update" htmlFor="form-newpassword">
  						<span className="input__label-content input__label-content--update">Update password here</span>
  					</label>
  				</span>
          </Col>
          </div>

          <Col md={4} className="update-buttons">


            <button type="submit"
                    className="update-user pull-left"
                    onClick={this.updateUser}>
              Update User
            </button>

            <button type="submit"
                    className="remove-user pull-right"
                    onClick={this.deleteUser}>
              Delete User
            </button>
          </Col>
        {/*</form>*/}
      </Grid>
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
