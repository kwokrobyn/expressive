import firebase from '../firebase';
const db = firebase.database();

// updates poll state in redux
const createPollAction = (pollInfo) => {
  return {
    type: "CREATE_POLL",
    pollInfo
  }
}

export const clearPollAction = () => {
  return {
    type: "CLEAR_POLL"
  }
}

// options
// { 1:
//       text: "orange"
//       result: 5
//    2: text: "blue
//       result : "}

// creates poll in firebase and dispatches to redux
export const createPoll = (pollInfo) => {
  return (dispatch) => {
    console.log('pollInfo', pollInfo);
    const pollRef = db.ref('rooms/' + pollInfo.roomId + '/poll');
    console.log('pollRef', pollRef);
    pollRef.set({
      isActive: true,
      question: pollInfo.question,
      option1: {text: pollInfo.option1, count: 0},
      option2: {text: pollInfo.option2, count: 0}
    }).then(() => {
      dispatch(createPollAction(pollInfo));

    }).catch((error) => {
      console.log('Error creating poll: ', error.message);
    })

  }

}

export const getPoll = (roomId) => {
  return (dispatch) => {

    const pollRef = db.ref('rooms/' + roomId + '/poll');
    pollRef.on("value", (snapshot) => {
      pollRef.once("value", (innerSnapshot) => {
        // there is currently a poll
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
      })
    })
  }
}

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
