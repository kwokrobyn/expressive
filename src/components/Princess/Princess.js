import React, { Component, PropTypes } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Navbar from '../Navbar/Navbar';

//Importing static assets (i.e. stylesheets, images)
import './Princess.css';

/**
 * Room Join
 */
export class Princess extends Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div className="errorpage">
      <Navbar />
        <h2 className="error-text"><b>404</b>: Your Princess Is In Another Castle.</h2>
        <h3 className="nomatch-text">No match for <code>{window.location.pathname}</code></h3>
        <div className="errorpage-img"></div>
      </div>
    )
  }
}

export default Princess;
