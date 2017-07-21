import uuid from 'uuid';

const defaultUser = {
  id: uuid.v4(),
  email: "",
  name: "Guest",
  isSignedIn: false
}

const userReducer = (state = defaultUser, action) => {

  switch (action.type) {
    case "SIGN_IN_SUCCESS":
      return {
        id: action.user.uid,
        email: action.user.email,
        name: action.user.name,
        isSignedIn: true
      }
    case "SIGN_OUT":
      return defaultUser;
    default:
        return state;
  }
}

export default userReducer;
