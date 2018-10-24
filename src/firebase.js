import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBkB6GbTIgwB9oW0bYePYIYUp22rqpBniM",
  authDomain: "website-9779d.firebaseapp.com",
  databaseURL: "https://website-9779d.firebaseio.com",
  projectId: "website-9779d",
  storageBucket: "website-9779d.appspot.com",
  messagingSenderId: "755809590070"
};


firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

