import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

//Importing static assets (i.e. stylesheets, images)
import './MasterRoom.css';

//Importing React Components
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import QuestionList from '../Room/QuestionList/QuestionList';

import { toggleRoom, updateRoomName } from '../../actions/roomActions';

/**
 * Room
 */
export class MasterRoom extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);

    this.state = ({
      isActive: this.props.room.isActive
    })
  }

  toggleActive = (e) => {
    if (e.target.checked) {
      console.log('this just got checked');
      const roomInfo = {
        room: this.props.room,
        isActive: true
      }
      console.log(this.props.room);
      this.props.toggleRoom(roomInfo);
    } else {
      console.log('this just got unchecked');
      const roomInfo = {
        room: this.props.room,
        isActive: false
      }
      console.log(this.props.room);
      this.props.toggleRoom(roomInfo);
    }
    console.log(this.state);
  }

  updateRoomName = (e) => {
    const updatedRN = document.getElementById('update-room-name').value;
    const roomId = this.props.room.roomId;
    const user = this.props.user;
    const roomInfo = {
      updatedName: updatedRN,
      roomId: roomId,
      user: user
    }
    console.log(user);
    console.log('sending this updated roomname ', roomInfo);
    this.props.updateRoomName(roomInfo);
  }

  render() {
    return (
      <div className="container-fluid">
        <Navbar pageTitle={'Currently in ' + this.props.room.roomName} />
        <div className="row master-room-header">
          <div className="col-md-8 master-room-roomName-col">
            <input id="update-room-name" defaultValue={this.props.room.roomName}></input>
            <button onClick={this.updateRoomName}>Edit Room Name</button>
          </div>
          <div className="col-md-4 master-room-isActive-col">
            <form>
              <label id="room-active-checkbox">
                {this.props.room.isActive ? (<input type="checkbox" onChange={this.toggleActive} checked/>) : (<input type="checkbox" onChange={this.toggleActive}/>)}
                <div className="switcher__indicator" id="room-active-checkbox-toggle" checked={this.state.isActive}></div>
                {this.props.room.isActive ? (<span>Room Active</span>) : (<span>Room Not Active</span>)}
              </label>{ /* /#room-post-anon-checkbox */ }
            </form>
          </div>
        </div>

        <div className="row master-room-stats">
          <div className="col-md-2 master-room-asked-col">
          </div>
          <div className="col-md-2 master-room-completed-col">
          </div>
          <div className="col-md-2 master-room-online-col">
          </div>
          <div className="col-md-1 col-md-offset-2 master-room-settings-col">
          </div>
        </div>

        <div className="row master-room-responses-row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="master-room-responses-column">
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
    toggleRoom: (roomInfo) => {
      dispatch(toggleRoom(roomInfo))
    },
    updateRoomName: (roomInfo) => {
      dispatch(updateRoomName(roomInfo))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MasterRoom);
