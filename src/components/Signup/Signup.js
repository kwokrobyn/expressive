//Importing required packages
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { localSignUp, localSignIn, signOut } from '../../actions/userActions';

//Importing static assets (i.e. stylesheets, images)
import './Signup.css';

//Importing React Components


class Signup extends Component {
  constructor(props) {
    super(props);
  }

  localSignUp = (e) => {
    e.preventDefault();
    const email = document.getElementById('email-signup').value;
    const password = document.getElementById('pwd-signup').value;
    const name = document.getElementById('name-signup').value;
    const user = {
                  email: email,
                  password: password,
                  name: name
                };
    this.props.localSignUp(user);
  }

  localSignIn = (e) => {
    e.preventDefault();
    const email = document.getElementById('email-signin').value;
    const password = document.getElementById('pwd-signin').value;
    const user = {
                  email: email,
                  password: password
    };
    this.props.localSignIn(user);
  }

  signOut = (e) => {
    e.preventDefault();
    this.props.signOut();
  }

  render() {
    return (
      <div className="container-fluid">
        <h1>Signup</h1>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email address:</label>
            <input type="email" className="form-control" id="email-signup" />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input type="password" className="form-control" id="pwd-signup" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Name:</label>
            <input type="email" className="form-control" id="name-signup" />
          </div>
          <button type="submit" className="btn btn-default" onClick={this.localSignUp}>Sign Up</button>
        </form>
        <hr />
        <form>
          <div className="form-group">
            <label htmlFor="email">Email address:</label>
            <input type="email" className="form-control" id="email-signin" />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input type="password" className="form-control" id="pwd-signin" />
          </div>
          <button type="submit" className="btn btn-default" onClick={this.localSignIn}>Sign In</button>
        </form>

        <button type="submit" className="btn btn-default" onClick={this.signOut}>Log Out</button>

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
    localSignUp: (user) => {
      dispatch(localSignUp(user))
    },
    localSignIn: (user) => {
      dispatch(localSignIn(user))
    },
    signOut: () => {
      dispatch(signOut())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
