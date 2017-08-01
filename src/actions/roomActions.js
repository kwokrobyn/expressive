
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

const noRooms = () => {
  return {
    type: 'NO_ROOMS'
  }
}

/*
* JOIN & LEAVE ROOM actions
*/
//join room
const joinRoomAction = (room) => {
  return {
    type: 'JOIN_ROOM',
    room
  }
}

//leave room
const leaveRoomAction = () => {
  return {
    type: 'LEAVE_ROOM'
  }
}

// if master signs out, ensure that master view changes to anon view
export const toggleMaster = (toggle) => {
  return {
    type: 'TOGGLE_MASTER',
    toggle
  }
}

const toggleRoomAction = (isActive) => {
  return {
    type: 'TOGGLE_ROOM',
    isActive
  }
}

const updateRoomNameAction = (roomName) => {
  return {
    type: 'UPDATE_ROOM_NAME',
    roomName
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
    // attaches a persistent event listener that is called whenever value in /ownedRooms changes
    ownedRoomsRef.on("value", (snapshot) => {
      console.log('get user rooms snapshot', snapshot.val());

      ownedRoomsRef.once("value", (innerSnapshot) => {
        console.log(innerSnapshot.val());
        if (innerSnapshot.exists()) {
          dispatch(getUserRoomsAction(innerSnapshot.val()));
        } else {
          dispatch(noRooms());
          console.log('No rooms owned by this user.');
        }
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
      },
      poll: {
        isActive: false
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

// JOIN ROOM
export const joinRoom = (roomInfo) => {
  return (dispatch) => {
    console.log(roomInfo);

    const roomRef = db.ref('rooms/' + roomInfo.roomId + '/userList');
    roomRef.update({
      // ADD USER TO ROOM
      // add user to room's userList
      [roomInfo.user.uid]: {
        name: roomInfo.user.displayName
      }
    }).then(() => {
      dispatch(joinRoomAction(roomInfo));
      console.log('user has joined room', roomInfo);
    }).catch((error) => {
      console.log('Error while joining room: ', error.message);
    });
  }
}

//LEAVE ROOM
export const leaveRoom = (roomInfo) => {
  return (dispatch) => {

    const roomRef = db.ref('rooms/' + roomInfo.roomId + '/userList/' + roomInfo.user.uid);
    roomRef.remove()
    .then(() => {
      console.log('Room left in DB');
      dispatch(leaveRoomAction());
    })
    .catch((error) => {
      console.log('Error leaving room: ', error.message);
    });
  }
}

//DELETE ROOM
export const deleteRoom = (deleteInfo) => {
  return (dispatch) => {
    console.log(deleteInfo);
    const userRef = db.ref('users/' + deleteInfo.user.uid + '/ownedRooms/' + deleteInfo.roomId);
    userRef.remove()
    .then(() => {
      console.log('Room deleted from userList');
    })
    .catch((error) => {
      console.log('Error deleting room from userList: ', error.message);
    });
    const roomRef = db.ref('rooms/' + deleteInfo.roomId);
    roomRef.remove()
    .then(() => {
      console.log('Room deleted from firebase');
    })
    .catch((error) => {
      console.log('Error deleting room: ', error.message);
    });
  }
}

//TOGGLE ROOM Active
export const toggleRoom = (roomInfo) => {
  return (dispatch) => {
    console.log(roomInfo);
    console.log(roomInfo.room.roomId);
    const roomRef = db.ref('rooms/' + roomInfo.room.roomId);
    roomRef.update({
      // ADD USER TO ROOM
      // add user to room's userList
      isActive: roomInfo.isActive
    }).then(() => {
      dispatch(toggleRoomAction(roomInfo.isActive));
      console.log('roomState toggled to ', roomInfo.isActive);
    }).catch((error) => {
      console.log('Error while toggling roomState: ', error.message);
    });

  }
}

// check for room changes
export const renderRoomActiveState = (roomId) => {
  return (dispatch) => {
    db.ref('rooms/' + roomId + '/isActive').on('value', (snapshot) => {
      dispatch(toggleRoomAction(snapshot.val()));
    })
  }
}

// UPDATE ROOM NAME
export const updateRoomName = (roomInfo) => {
  return (dispatch) => {
    db.ref('users/' + roomInfo.user.uid + '/ownedRooms/' + roomInfo.roomId).update({
      name: roomInfo.updatedName
    })
    db.ref('rooms/' + roomInfo.roomId).update({
      name: roomInfo.updatedName
    }).then(() => {
      dispatch(updateRoomNameAction(roomInfo.updatedName));
      console.log('room name updated to ', roomInfo.updatedName);
    }).catch((error) => {
      console.log('Error while updating roomname: ', error.message);
    })
  }
}
