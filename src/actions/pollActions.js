import firebase from '../firebase';
const db = firebase.database();

// updates poll state in redux 
const createPollAction = (pollInfo) => {
  return {
    type: "CREATE_POLL",
    pollInfo
  }
}

// creates poll in firebase and dispatches to redux
export const createPoll = (pollInfo) => {
  const pollRef = db.ref('rooms/' + pollInfo.roomId + '/poll');
  pollRef.set({
    isActive: true,
    question: pollInfo.question,
    options: pollInfo.options
  }).then(() => {
    dispatch(createPollAction(pollInfo));

  }).catch((error) => {
    console.log('Error creating poll: ', error.message);
  })
}
