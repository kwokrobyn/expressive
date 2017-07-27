const defaultRoom = {
  isInRoom: false,
  uid: "",
  name: "",
  isMaster: false
}

const roomReducer = (state = defaultRoom, action) => {

  switch (action.type) {
    case "JOIN_ROOM":
      return {
        isInRoom: true,
        uid: action.rooms.uid,
        name: action.rooms.name,
        isMaster: true // join room as master? what about non masters?
      }
    default:
        return state;
  }
}

export default roomReducer;
