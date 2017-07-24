/*
* Actions to Reducer
*/


import firebase from '../firebase';
const db = firebase.database();

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
