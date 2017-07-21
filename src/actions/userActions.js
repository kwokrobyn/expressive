import firebase from '../firebase';

const db = firebase.database();

/*
* ACTIONS to reducer
*/
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

/*
* SIGN UP (local only)
*/
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

/*
* SIGN IN
*/
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

// export const socialSignIn = (platform) => {
//   return (dispatch) => {
//     let provider;
//     if (platform === 'facebook') {
//       provider = new firebase.auth.FacebookAuthProvider();
//     }
//     firebase.auth().getRedirectResult
//   }
// }


/*
* SIGN OUT
*/
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
