/*
POLL ACTIONS
Components - Poll, MasterRoom, QuestionList
*/

import firebase from '../firebase';
const db = firebase.database();

/*
Redux Actions
*/

// updates an active poll with current changes
const createPollAction = (pollInfo) => {
  return {
    type: "CREATE_POLL",
    pollInfo
  }
}

// switches poll isActive state to false
export const clearPollAction = () => {
  return {
    type: "CLEAR_POLL"
  }
}

/*
Firebase Actions
*/

// called by MasterRoom, create poll in firebase
export const createPoll = (pollInfo) => {
  return (dispatch) => {
    console.log('pollInfo', pollInfo);
    const pollRef = db.ref('rooms/' + pollInfo.roomId + '/poll');
    console.log('pollRef', pollRef);
    pollRef.set({
      isActive: true,
      question: pollInfo.question,
      option1: pollInfo.option1,
      option2: pollInfo.option2
    }).then(() => {
      dispatch(createPollAction(pollInfo));

    }).catch((error) => {
      console.log('Error creating poll: ', error.message);
    })
  }
}

// called by QuestionList, listener for currently active poll
export const getPoll = (roomId) => {
  return (dispatch) => {

    const pollRef = db.ref('rooms/' + roomId + '/poll');
    pollRef.on("value", (snapshot) => {
      pollRef.once("value", (innerSnapshot) => {
        // there is currently a poll
        if (innerSnapshot.exists()) {
          if (innerSnapshot.val().isActive === true) {
            // dispatch to get poll
            const pollInfo = {
              question: innerSnapshot.val().question,
              option1: innerSnapshot.val().option1,
              option2: innerSnapshot.val().option2
            }
            dispatch(createPollAction(pollInfo));
          } else {
            // dispatch to clear poll
            dispatch(clearPollAction());
          }
        }
      })
    })
  }
}

// called by QuestionList, updates poll with vote
export const addPollVote = (roomId, option) => {
  return (dispatch) => {
    const pollRef = db.ref('rooms/' + roomId + '/poll');
    if (option === 1) {

      pollRef.child('option1').once('value', (snapshot) => {
        var pollNum = snapshot.val().count;
        pollNum += 1;
        pollRef.child('option1').update({
            count: pollNum
          })
      })

    } else {

      pollRef.child('option2').once('value', (snapshot) => {
        var pollNum = snapshot.val().count;
        pollNum += 1;
        pollRef.child('option2').update({
            count: pollNum
          })
      })
    }
  }
}

// called by Poll detaches listener on dismount
export const endPoll = (roomId) => {
  return (dispatch) => {
    const pollRef = db.ref('rooms/' + roomId + '/poll');
    pollRef.update({
      isActive: false
    }).then(() => {
      dispatch(clearPollAction());
    })
  }
}
