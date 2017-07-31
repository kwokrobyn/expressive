//Importing required packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Grid, Col, form, FormGroup, FormControl, ControlLabel, HelpBlock, Row, Button} from 'react-bootstrap';

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

  roomDisplay = () => {
    const roomArray = [];
    Object.keys(this.props.ownedRooms).forEach((key) => {
      roomArray.push({
        key: key,
        name: this.props.ownedRooms[key].name
      })
    })

    const rooms = roomArray.map((e) => {
      return (
        <div className="col-md-4 col-xs-12 dashboard-roombox" key={e.key}>
          <div className="dashboard-roombox-name"> {e.name} </div>
          <div className="dashboard-roombox-user"> <b>Room ID:</b> {e.key} </div>
          <Link to={"/room/" + e.key}> Join room </Link>
          <button onClick={this.deleteRoom} data-id={e.key}>Delete room</button>
        </div>
      )
    })
    console.log(roomArray);
    return rooms;
  }

  deleteRoom = (e) => {
    e.preventDefault();
    const deleteTarget = e.target;
    const roomInfo = {
      user: this.props.user,
      roomId: deleteTarget.dataset.id
    }
    this.props.deleteRoom(roomInfo);
  }

  render() {
    console.log(this.props.user);
    return (
      <Grid id="dashList">
        <div className="row dashList">
          {this.roomDisplay()}
        </div>
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
