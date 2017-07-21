import uuid from 'uuid';

const defaultUser = {
  uid: uuid.v4(),
  email: "",
  displayName: "Guest",
  isSignedIn: false
}

const userReducer = (state = defaultUser, action) => {

  switch (action.type) {
    case "SIGN_IN_SUCCESS":
      return {
        uid: action.user.uid,
        email: action.user.email,
        displayName: action.user.displayName,
        isSignedIn: true
      }
    case "SIGN_OUT":
      return defaultUser;
    default:
        return state;
  }
}

export default userReducer;
