import React, { Component } from 'react';
import { connect } from 'react-redux';

//Importing static assets (i.e. stylesheets, images)
import './Room.css';

//Importing React Components
import Navbar from '../Navbar/Navbar';
import QuestionList from './QuestionList/QuestionList';

import { addQuestion, getQuestions } from '../../actions/questionActions';
import { setAnonDisplayName } from '../../actions/userActions';
import { renderRoomActiveState } from '../../actions/roomActions';



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

  componentDidMount() {
    this.props.renderRoomActiveState(this.props.roomString);
  }

  onChange = (e) => {
    let value = e.target.value;
    console.log(value);
    this.setState({question: value});
  }

  // fires on toggle 'post anonymous' switch
  toggleAnon = (e) => {
    // if checked
    if (e.target.checked) {

      this.setState({
        isAnonymous: true
      })
      // if unchecked
    } else {

      // user is not signed in - prompt for custom displayName
      if (!this.props.user.isSignedIn && this.state.setName === false) {
        document.querySelector('.name-modal-btn').click();

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
    // Clear contents after submission of question
    document.getElementById('room-post-qn-textarea').value = '';
    /* Here is where a successful posting notification might be triggered */
  }

  setDisplayName = (e) => {
    const displayName = document.querySelector('.display-name-input').value;
    this.props.setAnonDisplayName(displayName);
    this.setState({
      setName: true
    })
  }

  revertAnon = () => {
    this.setState({
      isAnonymous: true
    })
  }

  render() {
    const isActive = this.props.room.isActive;
    return (
      <div className="container-fluid">

        <Navbar pageTitle={'Currently in ' + this.props.room.roomName} />

          <div className="row room-post-qn-row">
          { isActive ? (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <form id="room-post-qn-group">
                {/* Post a question bar */}
                <textarea name="question" type="text" rows="2" className="room-post-qn-textarea" id="room-post-qn-textarea" required autoComplete="off" onChange={this.onChange}></textarea>
                <label htmlFor="room-post-qn-textarea" id="room-post-qn-textarea-label">
                  <span id="room-post-qn-textarea-label-span">Ask a question</span>
                </label>
                <label id="room-post-anon-checkbox">
                  {this.state.isAnonymous ? (<input type="checkbox" onChange={this.toggleAnon} checked/>) : (<input type="checkbox" onChange={this.toggleAnon}/>)}
                  <div className="switcher__indicator" id="room-post-anon-checkbox-toggle"></div>
                  <span>Post anonymously</span>
                </label>{ /* /#room-post-anon-checkbox */ }
                {/* Post button */}
                <input type="submit" id="room-post-qn-btn" value={this.state.isAnonymous ? ('Post as Anonymous') : ('Post as ' + this.props.user.displayName)} onClick={this.submitQuestion}/>
              </form>{ /* /.post-qn-group */ }
              { /* /.col-lg-12 col-md-12 col-sm-12 col-xs-12 */ }
            </div>

          ) : (
            <div className="room-not-active">Room Not Active</div>
          )}
          { /* /.row */ }
          </div>

        <div className="row room-responses-row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="room-responses-column">
            <QuestionList roomString={this.props.roomString}/> { /* /#room-responses-well */ }
          </div> { /* /#room-responses-column */ }
        </div> {/* /.room-responses-row */}

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
              <div className="modal-body" id="">
                <p>Choose a display name, or post anonymously.</p>
                <input type="text"
                       className="form-control display-name-input"
                       id="roomname"/>
                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.setDisplayName}>Use Name</button>
                <p>
                  <i>Once you choose a display name, it cannot be changed for the rest of the session.</i>
                </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.revertAnon}>Post anonymously</button>
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
    },
    renderRoomActiveState: (roomId) => {
      dispatch(renderRoomActiveState(roomId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
