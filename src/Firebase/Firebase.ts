import { initializeApp } from "firebase/app";

export const firebaseErrorString = "Firebase error ->";

const firebaseConfig = {
    apiKey: "AIzaSyCrg4uTrnj4SSTql58DyagIrt2BqNx3E7M",
    authDomain: "fantasydraftr.firebaseapp.com",
    projectId: "fantasydraftr",
    storageBucket: "fantasydraftr.firebasestorage.app",
    messagingSenderId: "269809678747",
    appId: "1:269809678747:web:20f006520438f06d3dc93e",
    measurementId: "G-GY41VNB2TZ",
};

export const app = initializeApp(firebaseConfig);
