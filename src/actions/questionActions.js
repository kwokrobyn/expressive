import uuid from 'uuid';

const getQuestionsAction = (questions) => {
  return {
    type: 'GET_QUESTIONS',
    questions
  }
}

export const getQuestions = (roomId) => {
  return (dispatch) => {
    const questionsRef = db.ref("rooms/" + roomId + '/questions');
    questionsRef.on("value", (snapshot) => {

      questionsRef.once("value", (innerSnapshot) => {
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
      upvote: {}, // no effect because object is empty
      isComplete: false,
      poster: questionInfo.poster
    }).then(() => {
      console.log('Question posted. ');
    }).catch((error) => {
      console.log('Error posting question: ', error.message);
    })
  }
}
