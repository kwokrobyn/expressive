import uuid from 'uuid';

const defaultUser = {
  uid: uuid.v4(),
  email: "",
  displayName: "Guest",
  isSignedIn: false,
  hasAuthError: false,
  errorMessage: ""
}

const roomReducer = (state = defaultUser, action) => {
  switch (action.type) {
    case "ROOMSTRING_EXISTS":
      return defaultUser;

    case "ROOMSTRING_AVAIL":
      return defaultUser;
    
    default:
        return state;
  }
}

export default roomReducer;
