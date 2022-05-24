import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBIWxSHLVzTLRuwbhqB2Db5EfdFt6hSY1s",
    authDomain: "mymoney-600bf.firebaseapp.com",
    projectId: "mymoney-600bf",
    storageBucket: "mymoney-600bf.appspot.com",
    messagingSenderId: "27571516128",
    appId: "1:27571516128:web:c8bf9720d4d6f97e1e1685"
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init service
const pojectFireStore = firebase.firestore();
const projectAuth = firebase.auth();
export { pojectFireStore, projectAuth };