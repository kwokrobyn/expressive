//Importing required packages
import React, { Component } from 'react';
import {Grid, FormGroup, FormControl, ControlLabel, Row } from 'react-bootstrap';

import { Link } from 'react-router-dom';

//Importing static assets (i.e. stylesheets, images)
import './LandingFeatures.css';

//Importing React Components

class LandingFeatures extends Component {
  constructor(props) {
    super(props);

    this.state = {
        value: '',
        joinroom: ""
        }
  }


  onChange = (e) => {
    let value = e.target.value;
    this.setState({joinroom: value});
    console.log(this.state.joinroom);
  }

  render() {
    return (
      <Grid fluid>

      {/* Join Room Url */}
       <Row className="url-row">
          <div className="landingfeatures-join-rm">
           <FormGroup>
             <ControlLabel className="joinRmLabel">Join A Room</ControlLabel>
             <FormControl
               type="text"
               placeholder="Enter Room URL"
               className="joinRmInput"
               id="joinroom"
               onChange={this.onChange}
               value ={this.state.joinroom}
             />
            {/* Join Room Button */}
              <Link to={"/room/" + this.state.joinroom}>
                <div className="joinroom-button">Join Room</div>
              </Link>
           </FormGroup>
           </div>
        </Row>

        {/* How to Use Title */}


          <div className="how-card">
            <h1 className="how-title">
            Features
            </h1>
          </div>



        {/* Featurettes */}

        <Row id="featurette">

        {/* <!-- Start Button 1 --> */}
          <div className="featurette-btns">
            <div className="featurette-btns-inner">
              <div className="featurette-btns-top">

                <i className="fa fa-question-circle"></i>

                <h4 className="feature-title">Post Real-Time Questions</h4>
              </div>
              {/* <!-- End ButtonTop --> */}
              <div className="featurette-btns-bottom">

                <i className="fa fa-question-circle-o"></i>

                <h4 className="feature-title-content">No More Class Interruptions</h4>

                <p>Ever felt that talks are often interrupted halfway due to impatience of wanting to get their questions answered? You can now post questions to the speaker without interrupting the session.</p>


              </div>

            </div>

          </div>

          {/* <!-- Start Button 2 --> */}
          <div className="featurette-btns">
            <div className="featurette-btns-inner">
              <div className="featurette-btns-top">

                <i className="fa fa-thumbs-up"></i>

                <h4 className="feature-title">Get Real-time Votes</h4>
              </div>
              {/* <!-- End ButtonTop --> */}
              <div className="featurette-btns-bottom">

                <i className="fa fa-thumbs-o-up"></i>

                <h4 className="feature-title-content">Want to Get Heard?</h4>

                <p>Feel like your questions are of some importance that needs to be addressed? Maybe the audience feels the same way about your questions too! Vote for your favourite question!</p>


              </div>

            </div>

          </div>

          {/* <!-- Start Button 3 --> */}
          <div className="featurette-btns">
            <div className="featurette-btns-inner">
              <div className="featurette-btns-top">

                <i className="fa fa-user-secret"></i>

                <h4 className="feature-title">Post Questions Anonymously</h4>
              </div>
              {/* <!-- End ButtonTop --> */}
              <div className="featurette-btns-bottom">

                <i className="fa fa-user-secret"></i>

                <h4 className="feature-title-content">Too Shy?</h4>

                <p>Don't like the attention but yet still want to get answers? You can post questions anonymously.</p>

              </div>

            </div>

          </div>

        </Row>


      </Grid>

    );
  }

}

export default LandingFeatures;
