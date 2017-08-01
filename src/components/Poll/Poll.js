//Importing required packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { getPoll, clearPollAction, addPollVote } from '../../actions/pollActions';


//Importing static assets (i.e. stylesheets, images)
import './Poll.css';

/**
 * Poll
 */
export class Poll extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);
    this.state = ({
      // if master, automatically render results
      // else, first render option input
      userEntered: this.props.room.isMaster
    })
  }

  componentDidMount() {
    this.props.getPoll(this.props.roomString);
  }

  submitPoll = (e) => {
    if (e.target.className === "option1-radio") {
      this.props.addPollVote(this.props.roomString, 1);
    } else {
      this.props.addPollVote(this.props.roomString, 2);
    }
    this.setState({
      userEntered: true
    })
  }


  render() {

    const pollActive = this.props.poll.isActive;
    const userEntered = this.state.userEntered;

    return (
      <div className="row" id="room-questionbox">
        {
          pollActive ? (
            <div> {
              userEntered ? (
                <div>Poll Results: Option 1 - {this.props.poll.option1.count}, Option 2 - {this.props.poll.option2.count}</div>
              ) : (
                <div>
                  <div>Poll Question: {this.props.poll.question}</div>
                  <label className="radio-inline"><input type="radio" className="option1-radio" name="optradio" onClick={this.submitPoll}/>{this.props.poll.option1.text}</label>
                  <label className="radio-inline"><input type="radio" className="option2-radio" name="optradio" onClick={this.submitPoll}/>{this.props.poll.option2.text}</label>
                </div>
              )
            }
            </div>
          ) : (
            <div></div>
          )
        }
      </div>
    )
  }

  componentWillUnmount() {
    this.props.clearPollAction();
  }

}

const mapStateToProps = (state) => {
  //console.log('mapStateToProps', state);
  return {
    user: state.user,
    room: state.room,
    questions: state.questions,
    poll: state.poll
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPoll: (roomId) => {
      dispatch(getPoll(roomId))
    },
    clearPollAction: () => {
      dispatch(clearPollAction());
    },
    addPollVote: (roomId, option) => {
      dispatch(addPollVote(roomId, option));
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
