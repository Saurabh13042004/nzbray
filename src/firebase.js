import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjiybVKkU06sn0E7fDW5xMtY4oldA92js",
  authDomain: "usenet-66754.firebaseapp.com",
  projectId: "usenet-66754",
  storageBucket: "usenet-66754.appspot.com",
  messagingSenderId: "713815783495",
  appId: "1:713815783495:web:5aa12e7f94f9bd6ffe5962"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const onAuthStateChanged = (user) => {
  if (user) {
    console.log('User is signed in, UID:', user.uid);
  } else {
    console.log('User is signed out');
  }
};
const signOut = () => {
  auth.signOut().then(() => {
    console.log('User signed out');
  }).catch((error) => {
    console.error('Error signing out:', error);
  });
};

export { app, db, auth, onAuthStateChanged , signOut };