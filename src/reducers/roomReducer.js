const defaultRoom = {
  isInRoom: false,
  roomId: "",
  roomName: "",
  isMaster: false,
  isActive: false
}

const roomReducer = (state = defaultRoom, action) => {

  switch (action.type) {
    case "JOIN_ROOM":
      return {
        isInRoom: true,
        roomId: action.room.roomId,
        roomName: action.room.roomName,
        isMaster: action.room.isMaster,
        isActive: action.room.isActive
      }

    case "LEAVE_ROOM":
      return {
        ...state,
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

    case "TOGGLE_ROOM":
      return {
        ...state,
        isActive: action.isActive
      }

    case "UPDATE_ROOM_NAME":
      return {
        ...state,
        roomName: action.roomName
      }

    default:
        return state;
  }
}

export default roomReducer;
