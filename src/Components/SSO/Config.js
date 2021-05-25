import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyAiTqUoIPktHrM66nIC7fRevgXvj7BzN-A",
  authDomain: "rebuy-47bc6.firebaseapp.com",
  databaseURL: "https://rebuy-47bc6-default-rtdb.firebaseio.com",
  projectId: "rebuy-47bc6",
  storageBucket: "rebuy-47bc6.appspot.com",
  messagingSenderId: "904980332172",
  appId: "1:904980332172:web:8bff740bf252313dd885a9",
  measurementId: "G-8HZ67NTJZW",
});

export default firebaseConfig;
