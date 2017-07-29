import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

//Importing static assets (i.e. stylesheets, images)
import './Room.css';

//Importing React Components
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import QuestionList from './QuestionList/QuestionList';

import { addQuestion, getQuestions } from '../../actions/questionActions';
import { setAnonDisplayName } from '../../actions/userActions';

/**
 * Room
 */
export class Room extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);

    this.state = ({
      question: "",
      isAnonymous: !this.props.user.isSignedIn,
      setName: false
    })
  }

  onChange = (e) => {
    let value = e.target.value;
    console.log(value);
    this.setState({question: value});
  }

  toggleAnon = (e) => {
    if (e.target.checked) {
      console.log('this just got checked');
      this.setState({
        isAnonymous: true
      })
    } else {
      console.log('this just got unchecked');
      // user is not signed in - prompt for custom displayName
      if (!this.props.user.isSignedIn && this.state.setName === false) {
        document.querySelector('.name-modal-btn').click();
        this.setState({
          setName: true
        })
      }
      this.setState({
        isAnonymous: false
      })
    }
  }

  submitQuestion = (e) => {
    e.preventDefault();
    console.log(this.props.user.uid);
    console.log(this.props.room.roomId);

    // if Anonymous checkbox is checked, set poster name as anonymous
    const posterName = (this.state.isAnonymous ? 'Anonymous' : this.props.user.displayName);

    const questionInfo = {
      text: this.state.question,
      posterName: posterName, //poster of the question
      posterID: this.props.user.uid,
      room: this.props.room.roomId
    }
    this.props.addQuestion(questionInfo);
  }

  setDisplayName = (e) => {
    const displayName = document.querySelector('.display-name-input').value;
    this.props.setAnonDisplayName(displayName);
  }

  render() {
    return (
      <div className="container-fluid">

        <Navbar pageTitle={'This is ' + this.props.room.roomName + ' !'} />

        <div className="row room-post-qn-row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <form id="room-post-qn-group">
              <div className="form-group">
                <div className="input-group">
                  {/* Post a question bar */}
                  <input type="text" className="form-control" aria-label="..." placeholder="Ask a question" onChange={this.onChange}/>
                  {/* Post button */}
                  <div className="input-group-btn room-post-qn-btn">
                    <span className="input-group-btn">
                      <button className="btn btn-default" type="button">
                        <span className="glyphicon glyphicon-ok" aria-hidden="true" onClick={this.submitQuestion}></span>
                      </button>
                      </span>
                  </div>{ /* /#room-post-qn-btn (Post button) */ }
                </div>{ /* /input-group */ }
              </div>
              <div className="checkbox" id="room-post-anon-checkbox">
                <label>
                  {this.state.isAnonymous ? (<input type="checkbox" onChange={this.toggleAnon} checked/>) : (<input type="checkbox" onChange={this.toggleAnon}/>)} Post anonymously
                </label>
              </div>{ /* /#oom-post-anon-checkbox */ }
            </form>{ /* /.post-qn-group */ }
          </div>{ /* /.col-lg-12 */ }
        </div>{ /* /.row */ }

        <div className="row room-responses-row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="room-responses-column">
            <QuestionList roomString={this.props.roomString}/> { /* /#room-responses-well */ }
          </div> { /* /#room-responses-column */ }
        </div> {/* /.room-responses-row */}

        <Footer />

        {/* invisible button for opening the modal */}
        <button type="button" className="name-modal-btn" data-toggle="modal" data-target="#nameModal">Open Modal</button>

        {/* modal for inputting a custom display name */}
        {/* data static and data keyboard attributes are important - prevent modal from closing when clicking outside */}
        <div id="nameModal" className="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
          <div className="modal-dialog">

            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Choose a Display Name</h4>
              </div>
              <div className="modal-body">
                <p>Choose a display name, or post anonymously.</p>
                <input type="text"
                       className="form-control display-name-input"
                       id="roomname"/>
                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.setDisplayName}>Use Name</button>
                <p>(Once you choose a display name, it cannot be changed for the rest of the session.)</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Post Anonymously</button>
              </div>
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
    question: state.questions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addQuestion: (questionInfo) => {
      dispatch(addQuestion(questionInfo))
    },
    getQuestions: (id) => {
      dispatch(getQuestions(id))
    },
    setAnonDisplayName: (name) => {
      dispatch(setAnonDisplayName(name))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
