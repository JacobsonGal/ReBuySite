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

// const dotenv = require("dotenv").config();
// console.log(dotenv);
// const {
//   API_KEY,
//   AUTH_DOMAIN,
//   DATABASE_URL,
//   PROJECT_ID,
//   STORAGE_BUCKET,
//   MESSAGING_SENDER_ID,
//   APP_ID,
//   MEASUREMENT_ID,
// } = process.env;
// console.log(process.env);

// const firebaseConfig = firebase.initializeApp({
//   apiKey: API_KEY,
//   authDomain: AUTH_DOMAIN,
//   databaseURL: DATABASE_URL,
//   projectId: PROJECT_ID,
//   storageBucket: STORAGE_BUCKET,
//   messagingSenderId: MESSAGING_SENDER_ID,
//   appId: APP_ID,
//   measurementId: MEASUREMENT_ID,
// });
// export default firebaseConfig;
