import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA0qZrTvI_BCgFsHimme_FM1E7yn090by0",
    authDomain: "engenhariadesoftware-182d3.firebaseapp.com",
    projectId: "engenhariadesoftware-182d3",
    storageBucket: "engenhariadesoftware-182d3.appspot.com",
    messagingSenderId: "838797378594",
    appId: "1:838797378594:web:2db18da99d90b7e53cb67b",
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

