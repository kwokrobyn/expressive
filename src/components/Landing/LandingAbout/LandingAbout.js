//Importing required packages
import React, { Component, PropTypes } from 'react';

//Importing static assets (i.e. stylesheets, images)
import './LandingAbout.css';

//Importing React Components

/**
 * LandingAbout
 */

class LandingAbout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
      </div>
    );
  }

}

export default LandingAbout;
