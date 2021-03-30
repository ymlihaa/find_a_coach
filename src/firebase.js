import firebase from "firebase/app";
import "firebase/firestore";

const firebaseApp = firebase.initializeApp({
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  apiKey: "AIzaSyDM_ovfQbQibtp_rV1ZzYL3jq02BA42DnY",
  authDomain: "find-a-coach-ef194.firebaseapp.com",
  projectId: "find-a-coach-ef194",
  storageBucket: "find-a-coach-ef194.appspot.com",
  messagingSenderId: "535495600091",
  appId: "1:535495600091:web:a23495785d707820c429fe",
  measurementId: "G-XE75D1QNHK",
});

const db = firebaseApp.firestore();

export { db };
