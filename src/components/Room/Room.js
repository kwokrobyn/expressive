import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Room
 */
export class Room extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);
  }

  static propTypes = {
    match: PropTypes.object.isRequired
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>{this.props.match.params.id}</div>
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
