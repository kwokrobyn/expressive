//Importing required packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

// Importing Redux Actions
import { getQuestions, addVote, unVote } from '../../../actions/questionActions';

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

  // upvote = (id) => {
  //   // e.preventDefault();
  //   const voteInfo = {
  //     question: id,
  //     user: this.props.user.id,
  //     room: this.props.room.roomId
  //   }
  //   this.props.addVote(voteInfo);
  // }

  // https://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key-with-date-value
  sortByKey = (array, key) => {
    return array.sort((a, b) => {
      const x = a[key];
      const y = b[key];
      return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
  }

  toggleVote = (e) => {
    const upvote = e.target;
    console.log(upvote.dataset.toggle);
    const voteInfo = {
      question: upvote.dataset.id,
      room: this.props.room.roomId
    }
    if (upvote.dataset.toggle == 'false') { // for some reason, this false needs to be a string (2004)
      upvote.dataset.toggle = true;
      upvote.style.color = "rgba(243,150,72,1)";
      console.log('question: ', upvote.dataset.id);
      console.log('room:', this.props.room.roomId);

      this.props.addVote(voteInfo);
    } else {
      this.props.unVote(voteInfo);
      upvote.dataset.toggle = false;
      upvote.style.color = "rgba(48,48,48,1)";
    }

  }

  // questionDisplay
  questionDisplay = () => {
    var questionArray = [];
    Object.keys(this.props.questions).forEach((key) => {
      questionArray.push({
        key: key,
        text: this.props.questions[key].text,
        upvote: this.props.questions[key].upvote,
        posterName: this.props.questions[key].posterName
      })
    })

    questionArray = this.sortByKey(questionArray, 'upvote');

    const questions = questionArray.map((e) => {
      console.log(e.key);
      return (
        <div className="col-md-12 col-xs-12 room-questionbox" key={e.key}>
          <div className="row">
            <div className="col-md-1">
              <i className="fa fa-chevron-circle-up upvote" aria-hidden="true" data-id={e.key} data-toggle={false} onClick={this.toggleVote}></i>
              <div className="upvote-num">{e.upvote}</div>
            </div>
            <div className="col-md-11">
              <div className="room-questionbox-name"> {e.text} </div>
              <div className="room-questionbox-user"> <b>Asked by:</b> {e.posterName} </div>
            </div>
          </div>
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
    },
    addVote: (voteInfo) => {
      dispatch(addVote(voteInfo));
    },
    unVote: (voteInfo) => {
      dispatch(unVote(voteInfo));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
