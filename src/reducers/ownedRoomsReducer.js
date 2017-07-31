/*
* Tracking the list of owned rooms
*/
const ownedRoomsReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_USER_ROOMS":
      return action.rooms;

    case "NO_ROOMS":
      return {};

    default:
        return state;
  }
}

export default ownedRoomsReducer;
