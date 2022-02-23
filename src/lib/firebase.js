// import { seedDatabase } from "../seed";
const config = {
  apiKey: "AIzaSyDJC3EGx5wJSSk-lKRZ9XVBJo3gh-HhwRI",
  authDomain: "instagram-clone-d3cb5.firebaseapp.com",
  projectId: "instagram-clone-d3cb5",
  storageBucket: "instagram-clone-d3cb5.appspot.com",
  messagingSenderId: "472127328408",
  appId: "1:472127328408:web:1f763cab53b08f95d800ed",
  measurementId: "G-BYR69BC071",
};

const firebase = window.firebase.initializeApp(config);
const { FieldValue } = window.firebase.firestore;

// seedDatabase(firebase);

export { firebase, FieldValue };
