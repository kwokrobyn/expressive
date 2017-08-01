import firebase from '../firebase';
const db = firebase.database();

const updateStats = (statInfo) => {
  return {
    type: "UPDATE_STATS",
    statInfo
  }

}

export const getStats = (roomId) => {
  return (dispatch) => {

    const roomRef = db.ref('rooms/' + roomId);
    roomRef.on('value', (snapshot) => {
      roomRef.once('value', (innerSnapshot) => {
        if (innerSnapshot.val().questions !== undefined) {
          const statInfo = {
            questionCount: Object.keys(innerSnapshot.val().questions).length,
            completeCount: Object.entries(innerSnapshot.val().questions)
                              .filter((e) => {
                                return e[1].isComplete === true
                              })
                              .length,
            onlineCount: Object.keys(innerSnapshot.val().userList).length
          }

          console.log('stat', statInfo);

          dispatch(updateStats(statInfo));
        }



      })
    })

  }


}
