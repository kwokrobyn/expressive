import uuid from 'uuid';

const defaultState = false;

const checkExistReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ROOMSTRING_EXISTS":
      return true;

    case "ROOMSTRING_AVAIL":
      return false;

    default:
        return state;
  }
}

export default checkExistReducer;
