import uuid from 'uuid';

const defaultUser = {
  uid: uuid.v4(),
  email: "",
  displayName: "Guest",
  isSignedIn: false,
  hasAuthError: false,
  errorMessage: ""
}

const userReducer = (state = defaultUser, action) => {

  console.log('Action: ', action.type);

  switch (action.type) {
    case "SIGN_IN_SUCCESS":
    // uid, email, displayName currently pulled from default firebase.auth() db.
      return {
        uid: action.user.uid,
        email: action.user.email,
        displayName: action.user.displayName,
        isSignedIn: true,
        hasAuthError: false,
        errorMessage: ""
      }
    case "SIGN_OUT":
      return defaultUser;
    // if auth error is true, update errorMessage
    case "AUTH_ERROR":
      return {
        ...state,
        hasAuthError: true,
        errorMessage: action.error
      }
    default:
        return state;
  }
}

export default userReducer;
