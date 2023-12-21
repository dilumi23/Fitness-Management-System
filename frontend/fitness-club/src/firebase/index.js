import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBpXwAATpWHDsqHtfuC0EQNRcco4MdtfBI",
    authDomain: "fitness-management-b20de.firebaseapp.com",
    projectId: "fitness-management-b20de",
    storageBucket: "fitness-management-b20de.appspot.com",
    messagingSenderId: "281948304150",
    appId: "1:281948304150:web:70e3f07b5d0a7772f09637",
    measurementId: "G-DL0JSGYVKF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
