import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkExisting } from '../../../actions/roomActions';

import { createRoom } from '../../../actions/roomActions';

/**
 * CreateRoom
 */
export class CreateRoom extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);

    this.state = ({
      errMessage: false
    })
  }

  createRoom = (e) => {
    e.preventDefault();
    const name = document.getElementById('roomname').value;
    const id = document.getElementById('roomstring').value;

    // unique string checker to input here
    if (!this.props.existing) {
      // pass room info to actions for firebase call. current user object is passed.
      const roomInfo = {
        name: name,
        uid: id,
        master: this.props.user
      }

      this.props.createRoom(roomInfo);
    } else {
      this.setState({errMessage: true});
      console.log("false here");
      console.log(this.state.errMessage);
    }
  }

  checkExisting = (e) => {
    e.preventDefault();
    const roomString = document.getElementById('roomstring').value;
    console.log(roomString);
    this.props.checkExisting(roomString);
  }

  render() {
    console.log(this.props.existing);
    return (
      <div className="container-fluid">
        <form>
          <div className="form-group">
            <label>Room Name:</label>
            <input type="text" className="form-control" id="roomname" />
          </div>
          <div className="form-group">
            <label>Room String:</label>
            <input type="text" className="form-control" id="roomstring" onChange={this.checkExisting}/>
            {this.props.existing ? (
              <h1>this room has been taken</h1>
            ) : (
              <h1>this room is available</h1>
            )}
          </div>
          <button type="submit" className="btn btn-default" onClick={this.createRoom}>Create Room</button>
          {this.state.errMessage &&
            <h1>not allowed</h1>
          }
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    existing: state.checkExist
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkExisting: (roomString) => {
      dispatch(checkExisting(roomString))
    },

    createRoom: (roomInfo) => {
      dispatch(createRoom(roomInfo))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom);
