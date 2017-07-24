import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * Room
 */
export class Room extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);

    this.state = {
      roomID: ""
    }
  }

  componentDidMount() {
    this.setState({roomID: window.location.toString()});
  }

  render() {

    return (
      <div>{this.state.roomID}</div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
