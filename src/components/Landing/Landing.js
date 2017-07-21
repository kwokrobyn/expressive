import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Landing
 */
export class Landing extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props)

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
        <form>
          <div className="form-group">
            <label htmlFor="email">Email address:</label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input type="password" className="form-control" id="pwd" />
          </div>
          <button type="submit" className="btn btn-default" onClick={this.localSignUp}>Submit</button>
        </form>
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
