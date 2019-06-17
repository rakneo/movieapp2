    
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAm88r7NaH0vQN9Fhzqs0bd64pzQUeYKCY",
    authDomain: "movieapp-2c4a2.firebaseapp.com",
    databaseURL: "https://movieapp-2c4a2.firebaseio.com",
    projectId: "movieapp-2c4a2",
    storageBucket: "",
    messagingSenderId: "177369287998",
    appId: "1:177369287998:web:4af19aba1c255adb"
  };

firebase.initializeApp(config);

export default firebase;