//Importing required packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { getPoll, clearPollAction, addPollVote, endPoll } from '../../actions/pollActions';


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

  endPoll = () => {
    this.props.endPoll(this.props.roomString);
  }


  render() {

    const pollActive = this.props.poll.isActive;
    const userEntered = this.state.userEntered;
    const isMaster = this.props.room.isMaster;

    return (
      <div>
        {
          pollActive ? (
            <div> {
              userEntered ? (
                <div> {
                  isMaster ? (
                    <div className="row" id="room-pollbox">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 room-pollbox-question">
                        <div id="room-pollbox-question-polltitle">Results:</div>
                        <div id="room-pollbox-question-text">{this.props.poll.question}</div>
                      </div>
                      <div>{this.props.poll.option1.text} - {this.props.poll.option1.count} votes, {this.props.poll.option2.text} - {this.props.poll.option2.count} votes</div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 room-pollbox-results">
                        <button type="button" className="btn" onClick={this.endPoll}>End Poll</button>
                      </div>
                    </div>
                  ) : (
                    <div className="row" id="room-pollbox">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 room-pollbox-question">
                        <div id="room-pollbox-question-polltitle">Results:</div>
                        <div id="room-pollbox-question-text">{this.props.poll.question}</div>
                      </div>
                      <div>{this.props.poll.option1.text} - {this.props.poll.option1.count} votes, {this.props.poll.option2.text} - {this.props.poll.option2.count} votes</div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 room-pollbox-question">
                        <button type="button" className="btn">Close</button>
                      </div>
                    </div>
                  )
                }
                </div>
              ) : (
                <div className="row" id="room-pollbox">

                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 room-pollbox-question">
                    <div id="room-pollbox-question-polltitle">Poll</div>
                    <div id="room-pollbox-question-text">{this.props.poll.question}</div>
                  </div>

                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="room-pollbox-options">

                    <label className="room-pollbox-radio-label">
                      <input className="room-pollbox-radio" id="room-pollbox-radio-1" type="radio" name="optradio" onClick={this.submitPoll}/>
                      <span className="room-pollbox-radio-outer">
                        <span className="room-pollbox-radio-inner"></span>
                      </span>
                      {this.props.poll.option1.text}
                    </label>

                    <label className="room-pollbox-radio-label">
                      <input className="room-pollbox-radio" id="room-pollbox-radio-2" type="radio" name="optradio"  onClick={this.submitPoll}/>
                      <span className="room-pollbox-radio-outer">
                        <span className="room-pollbox-radio-inner"></span>
                      </span>
                      {this.props.poll.option2.text}
                    </label>

                  </div>{/* / .room-pollbox-polltitle-options */}

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
    },
    endPoll: (roomId) => {
      dispatch(endPoll(roomId));
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
