import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../../actions/userActions';
import { checkExisting } from '../../../actions/roomActions';

/**
 * CreateRoom
 */
export class CreateRoom extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);
  }

  createRoom = (e) => {
    e.preventDefault();
    const roomName = document.getElementById('roomname').value;
    const roomString = document.getElementById('roomstring').value;
  }

  checkExisting = (e) => {
    e.preventDefault();
    const roomString = document.getElementById('roomstring').value;
    console.log(roomString);
    this.props.checkExisting(roomString);
  }

  render() {
    console.log("shady");
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
              <h1>yes</h1>
            ) : (
              <h1>no</h1>
            )}
          </div>
          <button type="submit" className="btn btn-default" onClick={this.createRoom}>Create Room</button>
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
      dispatch(checkExisting(roomString));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom);
