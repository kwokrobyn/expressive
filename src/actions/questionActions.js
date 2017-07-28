import uuid from 'uuid';
import firebase from '../firebase';

const db = firebase.database();

const getQuestionsAction = (questions) => {
  return {
    type: 'GET_QUESTIONS',
    questions
  }
}

export const getQuestions = (roomId) => {
  return (dispatch) => {
    console.log('getQuestions method.');
    const questionsRef = db.ref("rooms/" + roomId + '/questions');

    questionsRef.on("value", (snapshot) => {
      questionsRef.once("value", (innerSnapshot) => {
        console.log('About to dispatch', innerSnapshot.val());
        if (innerSnapshot.exists()) {
          
          dispatch(getQuestionsAction(innerSnapshot.val()));
        } else {
          console.log('No questions in this room.');
        }
      });

    });
  }
}

export const addQuestion = (questionInfo) => {
  return (dispatch) => {
    const uid = uuid.v4();
    const questionRef = db.ref('rooms/' + questionInfo.room + '/questions/' + uid);
    questionRef.set({
      text: questionInfo.text,
      upvote: 0,
      isComplete: false,
      poster: questionInfo.poster
    }).then(() => {
      console.log('Question posted. ');
    }).catch((error) => {
      console.log('Error posting question: ', error.message);
    })
  }
}

export const addVote = (voteInfo) => {
  return (dispatch) => {
    // const uid = uuid.v4();
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
