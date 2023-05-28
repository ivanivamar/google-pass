// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const environment = {
    firebase: {
        apiKey: "AIzaSyB9L_ihmbWLy0tj92qfCmy38ZkKu5Grdpw",
        authDomain: "materialpassword.firebaseapp.com",
        projectId: "materialpassword",
        storageBucket: "materialpassword.appspot.com",
        messagingSenderId: "811150366843",
        appId: "1:811150366843:web:932d614a28dcc18474eade",
        measurementId: "G-G3KRHWCYWQ"
    },
    production: false
};

// Initialize Firebase
const app = initializeApp(environment.firebase);
const analytics = getAnalytics(app);

// Path: material-kanban\src\environments\environment.prod.ts
