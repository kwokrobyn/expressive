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

/**
 * Room
 */
export class MasterRoom extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);

    this.state = ({

    })
  }

  render() {
    return (
      <div className="container-fluid">

        <Navbar pageTitle={'Currently in ' + this.props.room.roomName} />

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

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MasterRoom);
