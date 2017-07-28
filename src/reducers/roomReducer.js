const defaultRoom = {
  isInRoom: false,
  roomId: "",
  roomName: ""
}

const roomReducer = (state = defaultRoom, action) => {

  switch (action.type) {
    case "JOIN_ROOM":
      return {
        isInRoom: true,
        roomId: action.room.roomId,
        roomName: action.room.roomName
      }

    case "LEAVE_ROOM":
      return {
        isInRoom: false,
        roomId: "",
        roomName: ""
      }

    default:
        return state;
  }
}

export default roomReducer;
