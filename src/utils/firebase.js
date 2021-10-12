import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
require("dotenv").config();

//apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
var firebaseConfig = {
  apiKey: "AIzaSyAshmai-PoI2tSBDxobsdgYD2BZCJffJAc",
  authDomain: "mitaonlinestore.firebaseapp.com",
  projectId: "mitaonlinestore",
  storageBucket: "mitaonlinestore.appspot.com",
  messagingSenderId: "883771356947",
  appId: "1:883771356947:web:68a0eb1cc8456c83180ce6",
  measurementId: "G-NJ6QCL8WF9",
};

const firebase_app = initializeApp(firebaseConfig);
const firebase_auth = getAuth(firebase_app);

export { firebase_auth };
