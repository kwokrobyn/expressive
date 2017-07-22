import React, { Component } from 'react';

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

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <div className="dashboard" id="Dashboard">
              <h1>Dashboard</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// update UI from state
const mapStateToProps = (state) => {
    return {
      // user: state.user
    }
}

// update state in store
const mapDispatchToProps = (dispatch) => {
  return {
    // getUser:() => {dispatch(getUser());}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
