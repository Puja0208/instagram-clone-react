import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore/lite";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// import { seedDatabase } from "./seed";
const firebaseConfig = {
  apiKey: "AIzaSyDJC3EGx5wJSSk-lKRZ9XVBJo3gh-HhwRI",
  authDomain: "instagram-clone-d3cb5.firebaseapp.com",
  projectId: "instagram-clone-d3cb5",
  storageBucket: "instagram-clone-d3cb5.appspot.com",
  messagingSenderId: "472127328408",
  appId: "1:472127328408:web:1f763cab53b08f95d800ed",
  measurementId: "G-BYR69BC071",
};
const app = initializeApp(firebaseConfig);
// seedDatabase(app);
const db = getFirestore(app);

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
