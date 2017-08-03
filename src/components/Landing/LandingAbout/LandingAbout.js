//Importing required packages
import React, { Component } from 'react';
import {Grid, Col, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';

//Importing static assets (i.e. stylesheets, images)
import './LandingAbout.css';

//Importing React Components

/**
 * LandingAbout
 */

class LandingAbout extends Component {
  render() {
    return (
      <Grid fluid className="landing-about">
        {/* About Title */}

            <div className="about-card">
              <h1 className="about-title">
              About
              </h1>
            </div>

        {/* About section */}
        <Row>
          <div className="about-section-box">

            <Col md={6} xs={12} className="aboutSect">
              <div className="aboutImg"></div>
            </Col>

            <Col md={6} xs={12}>
            <div id="myCarousel" className="carousel slide" data-ride="carousel">
     {/* Indicators */}
     <ol className="carousel-indicators">
       <li data-target="#myCarousel" data-slide-to={0} className="active" />
       <li data-target="#myCarousel" data-slide-to={1} />
       <li data-target="#myCarousel" data-slide-to={2} />
     </ol>
     {/* Wrapper for slides */}
     <div className="carousel-inner">
       <div className="item active">
         <img src="la.jpg" alt="Chania" />
         <div className="carousel-caption">
           <h3>Los Angeles</h3>
           <p>LA is always so much fun!</p>
         </div>
       </div>
       <div className="item">
         <img src="chicago.jpg" alt="Chicago" />
         <div className="carousel-caption">
           <h3>Chicago</h3>
           <p>Thank you, Chicago!</p>
         </div>
       </div>
       <div className="item">
         <img src="ny.jpg" alt="New York" />
         <div className="carousel-caption">
           <h3>New York</h3>
           <p>We love the Big Apple!</p>
         </div>
       </div>
     </div>
     {/* Left and right controls */}
     <a className="left carousel-control" href="#myCarousel" data-slide="prev">
       <span className="glyphicon glyphicon-chevron-left" />
       <span className="sr-only">Previous</span>
     </a>
     <a className="right carousel-control" href="#myCarousel" data-slide="next">
       <span className="glyphicon glyphicon-chevron-right" />
       <span className="sr-only">Next</span>
     </a>
   </div>
            </Col>

            <Col md={6} xs={12} className="aboutText-box">
              <div className="aboutText">
                <p>
                  Our belief is that there is a fundamental problem with conventional question-and-answers (Q & A) sessions in forums.
                  <br/><br/>
                  The participants of conventional Q & A sessions are observed to be made up of three segments:
                  <br/>
                  1) Enquirers asking genuinely stimulating questions that foster the spirit of the discussion;
                  <br/>
                  2) Enquirers asking "bad" questions that are either self-serving or off-topic;
                  <br/>
                  3) The passive listeners who genuinely do not have questions or have genuine questions but suppress their opinions because they are taciturn or afraid of social backlash.
                  <br/><br/>
                  Our web service seeks to address this observed dysfunction in the respective two ways:
                  <br/>
                  1) A vote system for posed questions so the audience and moderators of the forum can assess the merits of the questions so they can be answered in a popular order given the scarcity of time;
                  <br/>
                  2) Reserved or vulnerable enquirers can pose their questions anonymously;
                  <br/>
                  <br/><br/>
                  <b>Read more about the problems of Q & A sessions:</b> Wedell-Wedellsborg, T. (2014, November 05). 4 Ways to Fix the Q&A Session. <i>Harvard Business Review</i>. Retrieved July 31, 2017, from https://hbr.org/2014/08/four-ways-to-fix-the-qa-session
                </p>
              </div>
            </Col>

          </div>

        </Row>

        {/* SignUp */}
        <h2 className="signup-title">Create a room by signing up now!</h2>

          <div className="signup-section">

              <Link to="/signup" className="signup-button-link">
                <div className="signup-button-about">Sign Up</div>
              </Link>

          </div>


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
