
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
const firebaseConfig = {
  apiKey: "AIzaSyArA91K7GyhWqYwBALXe3PJXuhhXQsAfmU",
  authDomain: "anchors-e3d37.firebaseapp.com",
  projectId: "anchors-e3d37",
  storageBucket: "anchors-e3d37.appspot.com",
  messagingSenderId: "505792195100",
  appId: "1:505792195100:web:a7a81ee6036c016ea6cdd9",
  measurementId: "G-L3GEQ24KS2",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth=firebase.auth()
const provider=new firebase.auth.GoogleAuthProvider();
export {auth,provider}
