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

        var questionCount;
        var completeCount;
        var onlineCount;

        //if there are questions update everything
        if (innerSnapshot.val().questions !== undefined) {
          questionCount = Object.keys(innerSnapshot.val().questions).length;
          completeCount = Object.entries(innerSnapshot.val().questions)
                            .filter((e) => {
                              return e[1].isComplete === true
                            })
                            .length
        } else {
          questionCount = 0
          completeCount = 0
        }

        // if there are users online update users
        if (innerSnapshot.val().userList !== undefined) {
          onlineCount = Object.keys(innerSnapshot.val().userList).length
        } else {
          onlineCount = 0
        }

        const statInfo = {
          questionCount: questionCount,
          completeCount: completeCount,
          onlineCount: onlineCount
        }

        dispatch(updateStats(statInfo));
      })
    })

  }
}

export const endStats = (roomId) => {
  return (dispatch) => {
    db.ref('rooms/' + roomId).off('value');
  }
}
