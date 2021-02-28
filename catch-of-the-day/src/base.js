import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBhcIMIeovq7LF-aDuAayTN7BM2KJfPadU",
  authDomain: "catch-of-the-day-annie-liao.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-annie-liao-default-rtdb.firebaseio.com",
})

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp }

export default base;