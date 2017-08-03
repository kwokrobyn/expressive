//Importing required packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Grid, Col} from 'react-bootstrap';

//Importing static assets (i.e. stylesheets, images)
import Navbar from '../Navbar/Navbar';
import CreateRoom from './CreateRoom/CreateRoom';
import DashList from './DashList/DashList';

//Importing React Components
import { signOut } from '../../actions/userActions';
import { getUserRooms, endGetUserRooms } from '../../actions/roomActions';

import './Dashboard.css';

/**
 * Dash
 */
export class Dashboard extends Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.getUserRooms(this.props.user.uid)
  }

  signOut = (e) => {
    e.preventDefault();
    this.props.signOut();
  }

  componentWillUnmount() {
    this.props.endGetUserRooms(this.props.user.uid);
  }


  render() {
    return (

        <Grid fluid id="dashboard-rooms-group">

          <Navbar pageTitle="Dashboard"/>

          <div className="row" id="dashboard-create-btn-group">
            {/* Submit Button */}
            <Col md={4} sm={6} smOffset={5} xs={8} xsOffset={5} className="dashboard-create-btn-Col">
              <a className="dashboard-create-btn-a"
                  id="create-new-room"
                  data-toggle="modal"
                  data-target="#navbar-create-room-modal"
                  >
                <span className="text" id="dashboard-create-btn-text">
                  Create a new room
                  <hr id="dashboard-create-btn-text-hr"/>
                  <span className="glyphicon glyphicon-triangle-bottom" id="dashboard-create-btn-text-glyphicon" aria-hidden="true"></span>
                </span>
                <span className="line -right"></span>
                <span className="line -top"></span>
                <span className="line -left"></span>
                <span className="line -bottom"></span>
              </a>
            </Col>{/* /.dashboard-create-btn-Col (Submit Button) */}
          </div>{ /* /#dashboard-create-btn-group */ }

          <DashList/>
          <CreateRoom/>
          { /* /#dashboard-rooms-group */ }
        </Grid>


    )
  }


  // render() {
  //
  //   return (
  //     <div className="container-fluid">
  //       <Navbar pageTitle="Dashboard"/>
  //       <div className="row">
  //         <div className="col-sm-6 col-sm-offset-3">
  //           <div className="dashboard" id="Dashboard">
  //             <CreateRoom />
  //             <div>{this.roomDisplay()}</div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
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
    signOut: () => {
      dispatch(signOut())
    },
    getUserRooms: (id) => {
      dispatch(getUserRooms(id))
    },
    endGetUserRooms: (id) => {
      dispatch(endGetUserRooms(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
