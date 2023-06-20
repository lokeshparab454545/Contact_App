// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDosNpjidBVAwc2LP4NzsZPohpf-pvSgPw",
    authDomain: "vite-contact-20bdc.firebaseapp.com",
    projectId: "vite-contact-20bdc",
    storageBucket: "vite-contact-20bdc.appspot.com",
    messagingSenderId: "565029703454",
    appId: "1:565029703454:web:96d2174081b3f58df0830f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);