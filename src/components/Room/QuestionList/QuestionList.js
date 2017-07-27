//Importing required packages
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Importing Redux Actions
import { getQuestions } from '../../../actions/questionActions';

//Importing static assets (i.e. stylesheets, images)
import './QuestionList.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

/**
 * Dash
 */
export class QuestionList extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.getQuestions(this.props.roomString);
    console.log('this.props.roomString: ', this.props.roomString);
  }

  // questionDisplay

  render() {
    return (
      <div className="well" id="room-responses-well">
        { /* Questions are posted in here */ }
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  //console.log('mapStateToProps', state);
  return {
    user: state.user,
    room: state.room
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getQuestions: (roomId) => {
      dispatch(getQuestions(roomId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
