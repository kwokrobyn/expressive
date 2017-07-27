import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

//Importing static assets (i.e. stylesheets, images)
import './Room.css';

//Importing React Components
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

/**
 * Room
 */
export class Room extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);
  }

  static propTypes = {
    match: PropTypes.object.isRequired
  }

  componentWillMount() {
    const matchVar = this.props.match;
    console.log(matchVar);
    console.log(matchVar.params.id);

  }

  render() {
    return (
      <div className="container">
        <Navbar pageTitle={'This is ' + this.props.match.params.id + ' !'} />
        <div className="row post-qn-group">
          <div className="col-lg-12">
            <div className="input-group">
              <input type="text" className="form-control" aria-label="..."/>
              <div className="input-group-btn">
                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action <span className="caret"></span></button>
                <ul className="dropdown-menu dropdown-menu-right">
                  <li><a href="#">Action</a></li>
                  <li role="separator" className="divider"></li>
                  <li><a href="#">Separated link</a></li>
                </ul>
              </div>{ /* /btn-group */ }
            </div>{ /* /input-group */ }
          </div>{ /* /.col-lg-6 */ }
        </div>{ /* /.row */ }
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
