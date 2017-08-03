import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Grid, Col } from 'react-bootstrap';

//Importing static assets (i.e. stylesheets, images)
import './InitRoom.css';

// Import firebase
import firebase from '../../firebase';

//Importing React Components
import Room from '../Room/Room';
import MasterRoom from '../MasterRoom/MasterRoom';
import Princess from '../Princess/Princess';

import { isFetching } from '../../actions/fetchingActions';
import { joinRoom, leaveRoom } from '../../actions/roomActions';

/**
 * Room Join
 */
export class InitRoom extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);

    this.props.isFetching(true);

    this.state = {
      roomExists: true,
      authComplete: false
    }

  }

  componentDidMount() {

    if (this.props.user.isSignedIn) {
      const db = firebase.database();

      const roomRef = db.ref("rooms/" + this.props.match.params.id);
      roomRef.once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.setState({
            roomExists: true,
            authComplete: true
          })


          const roomInfo = {
            roomName: snapshot.val().name,
            roomId: this.props.match.params.id,
            user: this.props.user,
            isMaster: snapshot.val().masterId === this.props.user.uid,
            isActive: snapshot.val().isActive
            }
          this.props.joinRoom(roomInfo);
        } else {
          this.setState({
            roomExists: false
          })
        }
      })
    } else {
      firebase.auth().signInAnonymously().then(() => {
        const db = firebase.database();

        const roomRef = db.ref("rooms/" + this.props.match.params.id);
        roomRef.once("value")
        .then((snapshot) => {
          if (snapshot.exists()) {
            this.setState({
              roomExists: true,
              authComplete: true
            })


            const roomInfo = {
              roomName: snapshot.val().name,
              roomId: this.props.match.params.id,
              user: this.props.user,
              isMaster: snapshot.val().masterId === this.props.user.uid,
              isActive: snapshot.val().isActive
              }
            this.props.joinRoom(roomInfo);
          } else {
            this.setState({
              roomExists: false
            })
          }
        })
      })
      .catch((error) => {
        console.log('Anonymous Sign In Failed: ', error.message);
        window.location.href = '/';
      })
    }

    // remove user from room userList on close window and back button
    window.onbeforeunload = (e) => {
      const roomInfo = {
        roomName: this.props.room.roomName,
        roomId: this.props.match.params.id,
        user: this.props.user
      }
      this.props.leaveRoom(roomInfo);
    }



  } // end of componentDidMount

  componentWillUnmount() {
    // remove user from room userList when component dismounts
    console.log('componentwillunmount');
    console.log(this.props.user);
    const roomInfo = {
      roomName: this.props.room.roomName,
      roomId: this.props.match.params.id,
      user: this.props.user
    }
    this.props.leaveRoom(roomInfo);
  }

  componentDidUpdate() {
    if (this.props.room.isInRoom && this.state.authComplete) {
      this.props.isFetching(false);
    }

    if (!this.state.roomExists) {
      this.props.isFetching(false);
    }
  }

  render() {
    const isRoom = this.state.roomExists;
    const isMaster = this.props.room.isMaster;
    return (
    <Grid fluid>
      { this.props.fetchState ? (
        <div className="join-room-container">

          <Col md={8} className="join-room-animation">
              <h2 className="join-room-text">
                Fetching Your Room...
              </h2>
              <div className="bookshelf_wrapper">
                <ul className="books_list">
                  <li className="book_item first"></li>
                  <li className="book_item second"></li>
                  <li className="book_item third"></li>
                  <li className="book_item fourth"></li>
                  <li className="book_item fifth"></li>
                  <li className="book_item sixth"></li>
                </ul>
                <div className="shelf"></div>
              </div>
          </Col>
        </div>
      ) : (
        <div>
        { isRoom ? ( <div>
          {
            isMaster ? (
              <MasterRoom roomString= {this.props.match.params.id}/>
            ) : (
              <Room roomString= {this.props.match.params.id}/>
            )
          }
        </div> ) : (
          <Princess />
        )

        }
        </div>

      ) }
    </Grid>

    )
  }
}

const mapStateToProps = (state) => {
    return {
      user: state.user,
      fetchState: state.isFetching,
      room: state.room
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    isFetching: (bool) => {
      dispatch(isFetching(bool))
    },
    joinRoom: (roomInfo) => {
      dispatch(joinRoom(roomInfo))
    },
    leaveRoom: (roomInfo) => {
      dispatch(leaveRoom(roomInfo))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InitRoom);
