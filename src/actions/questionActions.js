/*
QN ACTIONS
Components - QuestionList, Room
*/

import uuid from 'uuid';
import firebase from '../firebase';

const db = firebase.database();

/*
Redux Actions
*/

// update redux with updated questions from firebase
const getQuestionsAction = (questions) => {
  return {
    type: 'GET_QUESTIONS',
    questions
  }
}

// clear questions state on QuestionList unmount
const clearQuestions = () => {
  return {
    type: 'CLEAR_QUESTIONS'
  }
}

/*
Firebase Actions - Questions
*/

// called by questionList, firebase listener for updated questions in current room
export const getQuestions = (roomId) => {
  return (dispatch) => {
    console.log('getQuestions method.');
    const questionsRef = db.ref("rooms/" + roomId + '/questions');

    questionsRef.on("value", (snapshot) => {
      questionsRef.once("value", (innerSnapshot) => {
        console.log('About to dispatch', innerSnapshot.val());
        // only calls redux action if questions exist
        if (innerSnapshot.exists()) {
          dispatch(getQuestionsAction(innerSnapshot.val()));
        } else {
          console.log('No questions in this room.');
        }
      });

    });
  }
}

// called on QuestionList unmount, detach question listener
export const endGetQuestions = (roomId) => {
  return (dispatch) => {
    db.ref("rooms/" + roomId + '/questions').off('value');
    dispatch(clearQuestions());
  }
}

// called by Room, adds question to firebase
export const addQuestion = (questionInfo) => {
  return (dispatch) => {
    const uid = uuid.v4();
    const questionRef = db.ref('rooms/' + questionInfo.room + '/questions/' + uid);
    const timestamp = new Date();
    // var formattedTimestamp = timestamp.getDate() + "/" + timestamp.getUTCMonth() + "/" + timestamp.getFullYear() + ", " + timestamp.getHours() + ":" + timestamp.getMinutes() + ":" + timestamp.getSeconds();
    questionRef.set({
      text: questionInfo.text,
      upvote: 0,
      timePosted: timestamp.toString(),
      isComplete: false,
      posterName: questionInfo.posterName,
      posterID: questionInfo.posterID
    }).then(() => {
      console.log('Question posted. ');
    }).catch((error) => {
      console.log('Error posting question: ', error.message);
    })
  }
}

/*
Firebase Actions - Votes
*/

// called by questionList, increment vote count on question in firebase
export const addVote = (voteInfo) => {
  return (dispatch) => {

    const questionRef = db.ref('rooms/' + voteInfo.room + '/questions/' + voteInfo.question);

    questionRef.once('value', (snapshot) => {
      var voteNum = snapshot.val().upvote;
      voteNum += 1;
      console.log('this is the snapshot:', voteNum);

      questionRef.update({
        upvote: voteNum
      })

    })
  }
}

// called by questionList, decrease vote count on question
export const unVote = (voteInfo) => {
  return (dispatch) => {
    const questionRef = db.ref('rooms/' + voteInfo.room + '/questions/' + voteInfo.question);

    questionRef.once('value', (snapshot) => {
      var voteNum = snapshot.val().upvote;
      voteNum -= 1;
      console.log('this is the snapshot:', voteNum);

      questionRef.update({
        upvote: voteNum
      })

    })

  }
}

/*
Firebase Actions - Completion
*/

// called by QuestionList (in MasterRoom), question isComplete to true
export const markComplete = (completeInfo) => {
  return (dispatch) => {
    const questionRef =  db.ref('rooms/' + completeInfo.room + '/questions/' + completeInfo.question);

    questionRef.update({
      isComplete: true
    })

  }
}

// called by QuestionList (in MasterRoom), question isComplete to false  
export const markIncomplete = (completeInfo) => {
  return (dispatch) => {
    const questionRef =  db.ref('rooms/' + completeInfo.room + '/questions/' + completeInfo.question);

    questionRef.update({
      isComplete: false
    })
  }
}
