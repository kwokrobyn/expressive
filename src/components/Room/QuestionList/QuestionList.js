//Importing required packages
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Importing Redux Actions
import { getQuestions, endGetQuestions, addVote, unVote, markComplete, markIncomplete } from '../../../actions/questionActions';

// Import Child Components
import Poll from '../../Poll/Poll';

//Importing static assets (i.e. stylesheets, images)
import './QuestionList.css';

/**
 * Dash
 */
export class QuestionList extends Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.getQuestions(this.props.roomString);
    console.log('this.props.roomString: ', this.props.roomString);
  }

  // https://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key-with-date-value
  sortByKey = (array, key, rev) => {
    return array.sort((a, b) => {
      const x = a[key];
      const y = b[key];
      if (rev) {
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      } else {
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
      }

    });
  }

  toggleVote = (e) => {
    const upvote = e.target;
    const voteInfo = {
      question: upvote.dataset.id,
      room: this.props.room.roomId
    }
    if (upvote.dataset.toggle === 'false' && this.props.room.isActive === true) {
      upvote.dataset.toggle = true;
      upvote.style.color = "rgba(243,150,72,1)";
      console.log('question: ', upvote.dataset.id);
      console.log('room:', this.props.room.roomId);

      this.props.addVote(voteInfo);
    } else if (this.props.room.isActive === true) {
      this.props.unVote(voteInfo);
      upvote.dataset.toggle = false;
      upvote.style.color = "white";
    }
  }

  markAsComplete = (e) => {
    const complete = e.target;
    const completeInfo = {
      question: complete.dataset.id,
      room: this.props.room.roomId
    }

    if (complete.dataset.toggle === 'false') {
      complete.dataset.toggle = true;
      complete.style.color = "rgba(243,150,72,1)"; // completed style
      this.props.markComplete(completeInfo);
    } else {
      complete.dataset.toggle = false;
      complete.style.color = "rgba(243,245,242,1)"; // incomplete style
      this.props.markIncomplete(completeInfo);
    }

  }

  // questionDisplay
  questionDisplay = () => {
    var questionArray = [];
    // add incompleted questions to array
    Object.keys(this.props.questions).forEach((key) => {
      if (!this.props.questions[key].isComplete) {
        questionArray.push({
          key: key,
          text: this.props.questions[key].text,
          upvote: this.props.questions[key].upvote,
          posterName: this.props.questions[key].posterName,
          timePosted: this.props.questions[key].timePosted,
          isComplete: this.props.questions[key].isComplete
        })
      }
    });

    // sort array based on upvotes
    questionArray = this.sortByKey(questionArray, 'upvote', false);

    // add complete questions to array
    Object.keys(this.props.questions).forEach((key) => {
      if (this.props.questions[key].isComplete) {
        questionArray.push({
          key: key,
          text: this.props.questions[key].text,
          upvote: this.props.questions[key].upvote,
          posterName: this.props.questions[key].posterName,
          timePosted: this.props.questions[key].timePosted,
          isComplete: this.props.questions[key].isComplete
        })
      }
    })

    const isMaster = this.props.room.isMaster;

    const questions = questionArray.map((e) => {
      const isComplete = e.isComplete;
      console.log(e.key);
      return (
        <div className="row" id="room-questionbox" key={e.key}>
          <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12" id="room-questionbox-col-upvote">
            <i className="fa fa-arrow-up upvote" aria-hidden="true" data-id={e.key} data-toggle={false} onClick={this.toggleVote}></i>
            <div className="upvote-num">{e.upvote}</div>
          </div>
          <div className="col-md-10 col-sm-10 col-xs-12" id="room-questionbox-col-content">
            <div className="room-questionbox-name"> {e.text} </div>
            <div className="room-questionbox-user">
              <b>Asked by: </b>
              {e.posterName}
            </div>
            <div className="room-questionbox-timeposted">
              <b>Posted: </b>
              {e.timePosted}
            </div>
          </div>
          <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12" id="room-questionbox-col-complete">
          {
            isMaster ? (
              <div className="questionbox-answer">
              { isComplete ? (
                <div>
                  <i className="fa fa-check fa-2x checked" aria-hidden="true" data-id={e.key} data-toggle={true} onClick={this.markAsComplete}></i>
                  <span className="room-questionbox-col-complete-span">Closed</span>
                </div>
              ) : (
                <div>
                  <i className="fa fa-check fa-2x unchecked" aria-hidden="true" data-id={e.key} data-toggle={false} onClick={this.markAsComplete}></i>
                  <span className="room-questionbox-col-complete-span">Open</span>
                </div>
              ) }
              </div>
            ) : (
              <div className="questionbox-answer">
              { isComplete ? (
                <div>
                  <i className="fa fa-check fa-2x checked" aria-hidden="true"></i>
                  <span id="room-questionbox-col-complete-span">Answered</span>
                </div>
              ) : (
                <div className="room-questionbox-col-complete-empty">
                </div>
              ) }
              </div>
            )
          }
          </div>
        </div>
      );
    })
    return questions;
  }

  render() {
    return (
      <div className="well" id="room-responses-well">
        <Poll roomString={this.props.roomString}/>
        { this.questionDisplay() }
      </div>
    )
  }

  componentWillUnmount() {
    this.props.endGetQuestions(this.props.roomString);
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
    },
    markComplete: (completeInfo) => {
      dispatch(markComplete(completeInfo));
    },
    markIncomplete: (completeInfo) => {
      dispatch(markIncomplete(completeInfo));
    },
    endGetQuestions: (roomId) => {
      dispatch(endGetQuestions(roomId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
