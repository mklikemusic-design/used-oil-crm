import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAcpNhecoPkegeMKe6m0U6pq18FMm8_WAo",
  authDomain: "used-oil-crm.firebaseapp.com",
  projectId: "used-oil-crm",
  storageBucket: "used-oil-crm.firebasestorage.app",
  messagingSenderId: "130530042618",
  appId: "1:130530042618:web:75b6cb120df4a1a25cdf43"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);