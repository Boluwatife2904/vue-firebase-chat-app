import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRLftU7LYfT66gMkFEZLZmFHI8zvvtaxg",
  authDomain: "chat-app-8c97b.firebaseapp.com",
  projectId: "chat-app-8c97b",
  storageBucket: "chat-app-8c97b.appspot.com",
  messagingSenderId: "702303611501",
  appId: "1:702303611501:web:dce5582f3829c23a886d64"
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, timestamp };