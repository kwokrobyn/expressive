//Importing required packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Grid, Col, form, FormGroup, FormControl, ControlLabel, HelpBlock, Row, Button} from 'react-bootstrap';

//Importing static assets (i.e. stylesheets, images)
import Navbar from '../Navbar/Navbar';
import CreateRoom from './CreateRoom/CreateRoom';
import DashList from './DashList/DashList';

//Importing React Components
import { signOut } from '../../actions/userActions';
import { getUserRooms } from '../../actions/roomActions';



import './Dashboard.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

/**
 * Dash
 */
export class Dashboard extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.getUserRooms(this.props.user.uid)
    // document.getElementById('myModal').showModal();
  }

  signOut = (e) => {
    e.preventDefault();
    this.props.signOut();
  }


  render() {
    return (

        <Grid id="dashboard-rooms-group">

          <Navbar pageTitle="Dashboard"/>

          <div className="row" id="dashboard-create-btn-group">
            {/* Submit Button */}
            <Col className="dashboard-create-btn-Col">
              <a className="dashboard-create-btn-a"
                  id="create-new-room"
                  data-toggle="modal"
                  data-target="#myModal"
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
