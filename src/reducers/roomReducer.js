const defaultRoom = {
  isInRoom: false,
  roomId: "",
  roomName: "",
  isMaster: false
}

const roomReducer = (state = defaultRoom, action) => {

  switch (action.type) {
    case "JOIN_ROOM":
      return {
        isInRoom: true,
        roomId: action.room.roomId,
        roomName: action.room.roomName,
        isMaster: action.room.isMaster
      }

    case "LEAVE_ROOM":
      return {
        isInRoom: false,
        roomId: "",
        roomName: "",
        isMaster: false
      }

    case "TOGGLE_MASTER":
      return {
        ...state,
        isMaster: action.toggle
      }

    default:
        return state;
  }
}

export default roomReducer;
