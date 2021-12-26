// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiP7WKFM5rNvVg25Fd7huGc0ChtT3eOE0",
  authDomain: "shop-zone-17fa9.firebaseapp.com",
  projectId: "shop-zone-17fa9",
  storageBucket: "shop-zone-17fa9.appspot.com",
  messagingSenderId: "467959791229",
  appId: "1:467959791229:web:3444f9561bd63725e7fb14",
  measurementId: "G-RT2VNJ0N5R",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
