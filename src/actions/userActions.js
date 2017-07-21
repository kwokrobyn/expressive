import firebase from '../firebase';

const db = firebase.database();

const signInSuccess = (user) => {
  return {
    type: 'SIGN_IN_SUCCESS',
    user
  }
}

const signOutAction = () => {
  return {
    type: 'SIGN_OUT'
  }
}

export const localSignUp = (user) => {
  return (dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then((user) => {
      console.log('New user created: ', user);
      dispatch(signInSuccess(user));
    }, (error) => {
      console.log('Local sign up failed: ', error.message);
      // dispatch(signInError(error.message));
    });
  }
}

export const localSignIn = (user) => {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then((user) => {
      console.log('User successfully authenticated', user);
      dispatch(signInSuccess(user));
    }, (error) => {
      console.log('Local sign in failed: ', error.message);
      // dispatch(signInError(error.message));
    });
  }
}

export const signOut = (user) => {
  return (dispatch) => {
    firebase.auth().signOut()
    .then(() => {
      console.log('User successfully signed out.');
      dispatch(signOutAction());
    })
    .catch((error) => {
      console.log('There was an error when trying to sign out: ', error.message);
    });
  }
}
