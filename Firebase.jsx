// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCtyedPEPgn8XqPssn88fRuP-lUuL1aOIc",
  authDomain: "my-studies-react-native.firebaseapp.com",
  databaseURL: "https://my-studies-react-native-default-rtdb.firebaseio.com",
  projectId: "my-studies-react-native",
  storageBucket: "my-studies-react-native.appspot.com",
  messagingSenderId: "998596760130",
  appId: "1:998596760130:web:b90591974a980bac2813db",
  measurementId: "G-EGNXX6J528"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
