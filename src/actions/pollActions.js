import firebase from '../firebase';
const db = firebase.database();

// updates poll state in redux
const createPollAction = (pollInfo) => {
  return {
    type: "CREATE_POLL",
    pollInfo
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
