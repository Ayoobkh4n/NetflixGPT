// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqnbccAdMBYzMARPsnQXjp8wcuDYqmGgU",
  authDomain: "netflixgpt-7db3b.firebaseapp.com",
  projectId: "netflixgpt-7db3b",
  storageBucket: "netflixgpt-7db3b.firebasestorage.app",
  messagingSenderId: "127885188387",
  appId: "1:127885188387:web:496edd66e10659d19b4096",
  measurementId: "G-P7RXJHH67E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
