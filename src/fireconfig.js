import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcd2A933FGHwN0NkfD-vGGpJVvTX8C_10",
  authDomain: "ecommerce-425c2.firebaseapp.com",
  projectId: "ecommerce-425c2",
  storageBucket: "ecommerce-425c2.appspot.com",
  messagingSenderId: "586528029259",
  appId: "1:586528029259:web:67c3bf4d18003461542bce",
  measurementId: "G-JRRH2Z6FP2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app)

export default fireDB