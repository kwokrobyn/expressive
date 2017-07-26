
import firebase from '../firebase';

/*
* ROOM EXIST actions
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
* DASHBOARD ROOM LIST actions
*/
const getUserRoomsAction = (rooms) => {
  return {
    type: 'GET_USER_ROOMS',
    rooms
  }
}

/*
* DATABASE METHODS
*/
const db = firebase.database();

/*
* CHECK EXISTING (to checkExistReducer)
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
        dispatch(roomStringExists());
      } else {
        // roomstring exists in db, do not create
        dispatch(roomStringAvail());
      }
    });
  }
}

// GET USER ROOMS
export const getUserRooms = (id) => {
  return (dispatch) => {
    const ownedRoomsRef = db.ref("users/" + id + '/ownedRooms/');
    ownedRoomsRef.on("value", (snapshot) => {
      console.log('get user rooms snapshot', snapshot.val());

      ownedRoomsRef.once("value", (innerSnapshot) => {
        dispatch(getUserRoomsAction(innerSnapshot.val()));
      })
    })
  }
}


// ADD ROOM TO USER
const addRoomToUserRoomList = (roomInfo) => {

  const userRef = db.ref('users/' + roomInfo.master.uid + '/ownedRooms/' + roomInfo.uid);
  userRef.set({
    name: roomInfo.name
  }).then(() => {
    console.log('Room added to user roomlist success.');
  }).catch((error) => {
    console.log('Error adding room to user roomlist: ', error.message);
  })
}

// CREATE ROOM
export const createRoom = (roomInfo) => {
  return (dispatch) => {

    // Create Room in Firebase DB
    // db structure: name, masterId, isActive, userList (uid: {name: displayName})
    const roomRef = db.ref('rooms/' + roomInfo.uid);
    roomRef.set({
      name: roomInfo.name,
      masterId: roomInfo.master.uid,
      isActive: true,
      // add master as first user in userList
      userList: {
        [roomInfo.master.uid]: {
          name: roomInfo.master.displayName
        }
      }
    }).then(() => {
      console.log('Room created');
      // add room to user's list of created rooms
      addRoomToUserRoomList(roomInfo);

    }).catch((error) => {
      console.log('Error while creating room: ', error.message);
    });

  }
}
