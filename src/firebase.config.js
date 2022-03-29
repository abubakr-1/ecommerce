// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqV_HlJ-OXkYvy0n1u6zQDn2CxqttY0uI",
  authDomain: "e-commerce-5faef.firebaseapp.com",
  projectId: "e-commerce-5faef",
  storageBucket: "e-commerce-5faef.appspot.com",
  messagingSenderId: "5038484103",
  appId: "1:5038484103:web:f6173a92f891d11e74e622",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
