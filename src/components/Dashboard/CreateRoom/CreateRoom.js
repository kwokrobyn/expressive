import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createRoom } from '../../../actions/roomActions';

/**
 * CreateRoom
 */
export class CreateRoom extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);

  }

  createRoom = (e) => {
    e.preventDefault();
    const name = document.getElementById('roomname').value;
    const id = document.getElementById('roomstring').value;

    // unique string checker to input here

    // pass room info to actions for firebase call. current user object is passed. 
    const roomInfo = {
      name: name,
      uid: id,
      master: this.props.user
    }

    this.props.createRoom(roomInfo);


  }

  render() {
    return (
      <div className="container-fluid">
        <form>
          <div className="form-group">
            <label>Room Name:</label>
            <input type="text" className="form-control" id="roomname" />
          </div>
          <div className="form-group">
            <label>Room String:</label>
            <input type="text" className="form-control" id="roomstring" />
          </div>
          <button type="submit" className="btn btn-default" onClick={this.createRoom}>Create Room</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createRoom: (roomInfo) => {
      dispatch(createRoom(roomInfo))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom);
