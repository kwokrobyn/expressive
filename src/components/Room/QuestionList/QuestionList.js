//Importing required packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

// Importing Redux Actions
import { getQuestions } from '../../../actions/questionActions';

//Importing static assets (i.e. stylesheets, images)
import './QuestionList.css';

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
  questionDisplay = () => {
    const questionArray = [];
    Object.keys(this.props.questions).forEach((key) => {
      questionArray.push({
        key: key,
        text: this.props.questions[key].text
      })
    })
    const questions = questionArray.map((e) => {
      return (
        <div className="col-md-4 col-xs-12 dashboard-roombox" key={e.key}>
          <div className="dashboard-roombox-name"> {e.text} </div>
          <div className="dashboard-roombox-user"> <b>Question</b> {e.key} </div>
        </div>
      )
    })
    return questions;
  }

  render() {
    return (
      <div className="well" id="room-responses-well">
        { this.questionDisplay() }
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  //console.log('mapStateToProps', state);
  return {
    user: state.user,
    room: state.room,
    questions: state.questions
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
