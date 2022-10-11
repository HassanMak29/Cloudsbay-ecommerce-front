// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// import { initializeApp } from "firebase/app"; // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCa5jwWlSkHDTSIUbbwYI6u3mjyITGgTec",
  authDomain: "cloudsbay-e-commerce.firebaseapp.com",
  projectId: "cloudsbay-e-commerce",
  storageBucket: "cloudsbay-e-commerce.appspot.com",
  messagingSenderId: "999135535551",
  appId: "1:999135535551:web:8f2ae2439791af933f410a",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
