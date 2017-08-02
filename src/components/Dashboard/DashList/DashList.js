//Importing required packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Grid, Col, form, FormGroup, FormControl, ControlLabel, HelpBlock, Row} from 'react-bootstrap';

//Importing static assets (i.e. stylesheets, images)

//Importing React Components
import { getUserRooms, deleteRoom } from '../../../actions/roomActions';



import './DashList.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


export class DashList extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);
  }

  deleteRoom = (e) => {
    console.log('delted');
    e.preventDefault();
    const deleteTarget = e.target;
    const roomInfo = {
      user: this.props.user,
      roomId: deleteTarget.dataset.id
    }
    this.props.deleteRoom(roomInfo);
  }


  roomDisplay = () => {
    const roomArray = [];
    Object.keys(this.props.ownedRooms).forEach((key) => {
      roomArray.push({
        key: key,
        name: this.props.ownedRooms[key].name
      })
    })

    {/*const deleteRoomButton = (
        <div className="delete-room-outer pull-right">
          <div className="delete-room-inner" onClick={this.deleteRoom} >
            <label className="delete-room-inner-label">Delete</label>
          </div>
        </div>
    ) */}

    const rooms = roomArray.map((e) => {
      return (
        <Col md={3} sm={5} xs={12} className="dashboard-roombox" key={e.key}>
          <div className="delete-room-outer pull-right">
            <div className="delete-room-inner">
              <label onClick={this.deleteRoom} data-id={e.key} className="delete-room-inner-label">Delete</label>
            </div>
          </div>

          <div className="dashboard-roombox-name"> {e.name} </div>
          <div className="dashboard-roombox-user"> <b>Room ID:</b> {e.key} </div>
          <div className="overflow-hide">
            <div className="hole"></div>
            <Link to={"/room/" + e.key}>
              <div className="joinroom-link">Join room</div>
            </Link>
          </div>

        </Col>
      )
    })

    return rooms;
  }

  render() {
    return (
      <Grid fluid id="dashList">
        <Row className="dashList-row">
          <Col md={12} sm={12} xs={12} className="dashList-display">
            {this.roomDisplay()}
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  //console.log('mapStateToProps', state);
  return {
    user: state.user,
    ownedRooms: state.ownedRooms
  }
}

const mapDispatchToProps = (dispatch) => {
  //console.log('ownProps.user.uid', ownProps.user.uid);
  //getUserRooms(dispatch, ownProps.user.uid);
  return {
    getUserRooms: (id) => {
      dispatch(getUserRooms(id))
    },
    deleteRoom: (deleteInfo) => {
      dispatch(deleteRoom(deleteInfo))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashList);
