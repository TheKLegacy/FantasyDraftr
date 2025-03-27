// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCrg4uTrnj4SSTql58DyagIrt2BqNx3E7M",
    authDomain: "fantasydraftr.firebaseapp.com",
    projectId: "fantasydraftr",
    storageBucket: "fantasydraftr.firebasestorage.app",
    messagingSenderId: "269809678747",
    appId: "1:269809678747:web:20f006520438f06d3dc93e",
    measurementId: "G-GY41VNB2TZ",
};

export const firebaseErrorString = "Firebase error ->";

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
