import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

//Importing static assets (i.e. stylesheets, images)
import './CreatePoll.css';

import { createPoll } from '../../../actions/pollActions';



/**
 * CreatePoll
 */
export class CreatePoll extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);
  }

  componentDidMount() {

  }

  createPoll = () => {
    const question = document.getElementById('poll-question').value;
    const opt1 = document.getElementById('option1').value;
    const opt2 = document.getElementById('option2').value;
    const roomId = this.props.room.roomId;
    const pollInfo = {
      question: question,
      option1: {text: opt1, count: 0},
      option2: {text: opt2, count: 0},
      roomId: roomId
    }
    this.props.createPoll(pollInfo);
  }

  render() {
    return (
      <div id="create-poll-modal" className="modal fade" role="dialog">
        <div className="modal-dialog">

          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Create a New Poll</h4>
            </div>
            <div className="modal-body">
              <p> What's Your Question? </p>
              <input type="text"
                     className="form-control poll-input poll-question" id="poll-question"/>

              <p> Options: </p>
                <input type="text"
                       className="form-control poll-input poll-option" id="option1"/>
                <input type="text"
                      className="form-control poll-input poll-option" id="option2"/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.createPoll}>Create Poll</button>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    room: state.room,
    question: state.questions,
    stats: state.stats
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createPoll: (pollInfo) => {
      dispatch(createPoll(pollInfo))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePoll);
