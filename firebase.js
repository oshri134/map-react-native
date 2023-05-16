// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/database";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnnFJExKBKdvfp_kwdKndKIwxj336GF-s",
  authDomain: "map-react-native-b55bc.firebaseapp.com",
  projectId: "map-react-native-b55bc",
  storageBucket: "map-react-native-b55bc.appspot.com",
  messagingSenderId: "809503696701",
  appId: "1:809503696701:web:1a2a3b76833a4e0a064754",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const auth = firebase.auth();
export const db = () => getFirestore();

export default app;
