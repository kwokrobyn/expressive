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

  componentDidMount() {

  }

  render() {

    return (
      <div className="container-fluid">
        <Navbar pageTitle={'This is ' + this.props.match.params.id + ' !'} />
        <div className="row post-qn-row">
          <div className="col-lg-12">
            <form id="room-post-qn-group">
              <div className="form-group">
                <div className="input-group">
                  {/* Post a question bar */}
                  <input type="text" className="form-control" aria-label="..."/>
                  {/* Post button */}
                  <div className="input-group-btn room-post-qn-btn">
                    <span className="input-group-btn">
                      <button className="btn btn-default" type="button">Post</button>
                      </span>
                  </div>{ /* /Post button */ }
                </div>{ /* /input-group */ }
              </div>
              <div className="checkbox" id="room-post-anon-checkbox">
                <label>
                  <input type="checkbox"/> Post anonynously
                </label>
              </div>
            </form>{ /* /post-qn-group */ }
          </div>{ /* /.col-lg-12 */ }
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
