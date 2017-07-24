/*
* Room Actions
* Actions needed: CRUD for rooms
*/

import firebase from '../firebase';
const db = firebase.database();

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



    }).catch((error) => {
      console.log('Error while creating room: ', error.message);
    });

  }
}
