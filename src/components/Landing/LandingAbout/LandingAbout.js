//Importing required packages
import React, { Component, PropTypes } from 'react';
import {Grid, Col, form, FormGroup, FormControl, ControlLabel, HelpBlock, Row, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
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

  // onClick = (e) => {
  //  this.props.Signup(this.props.history);
  // }


  render() {
    return (
      <Grid>
        {/* About Title */}
        <Row>
          <Col md={12} mdOffset={2} sm={8} smOffset={3}>
            <h1 className="about">-About-</h1>
          </Col>
        </Row>

        {/* About section */}
        <Row>
          <Col md={10} mdOffset={2} sm={10} smOffset={2} xs={10} xsOffset={1}>

            <Col md={6} xs={6} className="aboutSect">
              <div className="aboutImg">About</div>
            </Col>

            <Col md={6} xs={6} className="featureFrame02">
              <div className="aboutText">
                <p>
                  test commit, without rebase consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            </Col>

          </Col>

        </Row>

        {/* SignUp */}

        <Row>
          <Col md={6} sm={6} smOffset={4} xs={6} xsOffset={3}>
            <h2 className="signUpTitle">Create a room by signing up now!</h2>
              <Link to="/signup"><Button bsSize="large" block className="SignUp">Sign Up</Button></Link>

          </Col>
        </Row>

      </Grid>

    );
  }

}

// const mapStateToProps = (state) => {
//     return state;
// }
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//       Signup(history){
//         history.push("/signup/")
//       }
//     }
// }
//
//
// export default connect(mapStateToProps, mapDispatchToProps) (LandingAbout);
export default LandingAbout;
