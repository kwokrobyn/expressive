import React, { Component } from 'react';
import { signOut } from '../../actions/userActions';
import { connect } from 'react-redux';

/**
 * Dash
 */
export class Dashboard extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);

    this.state = {
        email:"",
        password:"",
        error:"",
        user:""
    }
  }

  signOut = (e) => {
    e.preventDefault();
    this.props.signOut();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <div className="dashboard" id="Dashboard">
              <h1>Dashboard</h1>
              <button type="submit" className="btn btn-default" onClick={this.signOut}>Log Out</button>
            </div>
          </div>
        </div>
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
    signOut: () => {
      dispatch(signOut())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
