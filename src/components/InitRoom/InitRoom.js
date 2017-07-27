import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

//Importing static assets (i.e. stylesheets, images)
import './InitRoom.css';

// Import firebase
import firebase from '../../firebase';

//Importing React Components
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Room from '../Room/Room';

import { isFetching } from '../../actions/fetchingActions';
import { joinRoom } from '../../actions/roomActions';

/**
 * Room Join
 */
export class InitRoom extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);

    this.state = {
      roomExists: true
    }

  }

  static propTypes = {
    match: PropTypes.object.isRequired
  }

  // this.props.match.params.id
  componentDidMount() {
    const db = firebase.database();

    const roomRef = db.ref("rooms/" + this.props.match.params.id);
    roomRef.once("value")
    .then((snapshot) => {
      this.props.isFetching(false);
      if (snapshot.exists()) {
        this.setState({
          roomExists: true
        })
        console.log(snapshot.val());
        //here
        const roomInfo = {
          name: snapshot.val().name,
          uid: this.props.match.params.id,
          master: this.props.user,
          }
        this.props.joinRoom(roomInfo);
      } else {
        this.setState({
          roomExists: false
        })
      }
    })

  }

  render() {
    const isRoom = this.state.roomExists;
    return (
    <div>
      { this.props.fetchState ? (
        <div className="container-fluid join-room-container">
          <div className="join-room-text col-md-12">
            Fetching Your Room...
          </div>
          <div className="join-room-animation col-md-12">
            <div className="cssload-bell">
              <div className="cssload-circle">
                <div className="cssload-inner"></div>
              </div>
              <div className="cssload-circle">
                <div className="cssload-inner"></div>
              </div>
              <div className="cssload-circle">
                <div className="cssload-inner"></div>
              </div>
              <div className="cssload-circle">
                <div className="cssload-inner"></div>
              </div>
              <div className="cssload-circle">
                <div className="cssload-inner"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
        { isRoom ? (
          <Room roomString= {this.props.match.params.id}/>
        ) : (
          <div> Your Princess Is In Another Castle. </div>
        )

        }
        </div>

      ) }
    </div>

    )
  }
}

const mapStateToProps = (state) => {
    return {
      user: state.user,
      fetchState: state.isFetching
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    isFetching: (bool) => {
      dispatch(isFetching(bool))
    },
    joinRoom: (roomInfo) => {
      dispatch(joinRoom(roomInfo))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InitRoom);
