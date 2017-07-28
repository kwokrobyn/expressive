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

/**
 * Room
 */
export class Room extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);

    this.state = ({
      question: "",
      isAnonymous: !this.props.user.isSignedIn
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

  render() {
    return (
      <div className="container-fluid">

        <Navbar pageTitle={'Currently in ' + this.props.room.roomName} />

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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
