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

const authError = (error) => {
  return {
    type: 'AUTH_ERROR',
    error
  }
}

const addNewUser = (user) => {

  db.ref('users/' + user.uid).set({
    email: user.email,
    name: user.displayName,
    picture: user.photoURL,
    roomsOwned: []
  });
}

const updateUser = (user) => {

}


/*
* SIGN UP (local only)
*/
export const localSignUp = (inputUser) => {
  return (dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(inputUser.email, inputUser.password)
    .then((user) => {
      console.log('New user created: ', user);

      // update user's displayName with user input in firebase
      user.updateProfile({
        displayName: inputUser.displayName
      })
      .then(() => {
        console.log('Firebase update displayName successful.');
        // after update displayName, update redux store based on the firebase user
        dispatch(signInSuccess(user));
        // ...add user to firebase db
        addNewUser(user);


      }).catch((error) => {
        console.log('Firebase update displayName failed:', error.message);
      })

    }, (error) => {
      console.log('Local sign up failed: ', error.message);
      // reflect error in user state
      dispatch(authError(error.message));
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
      // update redux store with user information
      dispatch(signInSuccess(user));
    }, (error) => {
      console.log('Local sign in failed: ', error.message);
      dispatch(authError(error.message));
    });
  }
}

// Current Bugs - cannot sign up if local account with same email exists
// Merge is required (there is an implementation on firebase docs which
// requires additional password input - not optimal)
export const socialSignIn = (platform) => {
  return (dispatch) => {

    let provider;
    // choose provider based on what was clicked
    if (platform === 'facebook') {
      provider = new firebase.auth.FacebookAuthProvider();
    }

    else if (platform === 'google') {
      provider = new firebase.auth.GoogleAuthProvider();
    }

    firebase.auth().signInWithPopup(provider)
    .then((result) => {
      var token = result.credential.accessToken;

      console.log('user passed by platform: ', result.user);

      // update redux store with user information
      dispatch(signInSuccess(result.user));
      // add to firebase db
      addNewUser(result.user);
    }).catch((error) => {
      console.log('Social authentication failed: ', error.message);
      dispatch(authError(error.message));
    });
  }
}


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
      dispatch(authError(error.message));
    });
  }
}
