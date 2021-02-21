import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBIijrxToR9ZtLZ1pofNXY_x6XhaE3r70k",
    authDomain: "crud-77bf0.firebaseapp.com",
    projectId: "crud-77bf0",
    storageBucket: "crud-77bf0.appspot.com",
    messagingSenderId: "34444957540",
    appId: "1:34444957540:web:a981de0ade89b5a5bacc71"
  }

export const firebaseApp = firebase.initializeApp(firebaseConfig)