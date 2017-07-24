import firebase from '../firebase';

/*
* ACTIONS to reducer
*/
const roomStringExists = () => {
  return {
    type: 'ROOMSTRING_EXISTS'
  }
}

const roomStringAvail = () => {
  return {
    type: 'ROOMSTRING_AVAIL'
  }
}

/*
* DATABASE METHODS
*/
const db = firebase.database();

/*
* CHECK EXISTING
*/
export const checkExisting = (roomString) => {
  return (dispatch) => {
    const ref = db.ref("rooms/" + roomString);
    ref.once("value")
    .then((snapshot) => {
      console.log('This is the snapshot', snapshot.val());
      if (snapshot.exists()) {
        // roomstring does not exist in db, create new room
        console.log("exists");
        dispatch(roomStringAvail());
      } else {
        // roomstring exists in db, do not create
        dispatch(roomStringExists());
      }
    });
  }
}
