import firebase from 'firebase/compat/app';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCtyedPEPgn8XqPssn88fRuP-lUuL1aOIc",
    authDomain: "my-studies-react-native.firebaseapp.com",
    databaseURL: "https://my-studies-react-native-default-rtdb.firebaseio.com",
    projectId: "my-studies-react-native",
    storageBucket: "my-studies-react-native.appspot.com",
    messagingSenderId: "998596760130",
    appId: "1:998596760130:web:9fb3ce312a429b652813db",
    measurementId: "G-B1H09VWFTR"
};

if (firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
}

const db= getDatabase();

export {db}