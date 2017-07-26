import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBbDvU0KwrbKRD-vsnFVlR-pgUbRYtBOQc",
    authDomain: "expressive-86f54.firebaseapp.com",
    databaseURL: "https://expressive-86f54.firebaseio.com",
    projectId: "expressive-86f54",
    storageBucket: "",
    messagingSenderId: "218222184792"
  };

firebase.initializeApp(config);

export default firebase;
