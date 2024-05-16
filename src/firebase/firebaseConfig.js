import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDy3sKd9VCbCa6GiJNSAliuah6fyEUrd10",
  authDomain: "capablecareer.firebaseapp.com",
  databaseURL: "https://capablecareer-default-rtdb.firebaseio.com",
  projectId: "capablecareer",
  storageBucket: "capablecareer.appspot.com",
  messagingSenderId: "303250442163",
  appId: "1:303250442163:web:95ffed52e2128677216dc6",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
