// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app'
import { addDoc, query, collection, deleteDoc, doc, getDoc, getFirestore, serverTimestamp, getDocs, updateDoc } from "firebase/firestore"
import { useCollection } from 'react-firebase-hooks/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUXHD0LOf7eas6dlcO10Sv1PWTg9jyWEU",
  authDomain: "family-feud-c4aa8.firebaseapp.com",
  projectId: "family-feud-c4aa8",
  storageBucket: "family-feud-c4aa8.appspot.com",
  messagingSenderId: "511465325194",
  appId: "1:511465325194:web:0b539cc12c122964082373"
};

// Initialize Firebase
console.log("initliaze fieestoe")
const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(app);



export const createAnswer = (category, answer, points, index) => {
    const answerColRef = collection(db, "Answers");
    return addDoc(answerColRef, {
        answer: answer, 
        points: points,
        category: category,
        index: index
    });
};

export const createCategoryDocument = (category, nrAnswers) => {
  const answerColRef = collection(db, "Answers");
  addDoc(answerColRef, {
    category: category,
    answer: "info",
    nrAnswers: nrAnswers,
  });
}

export const WrongAnswer = (value) => {
  const collectionRef = doc(db, "WrongAnswer", "flag");

  updateDoc(collectionRef, {
    value: value,
  })
}

export async function clearDocument() {
  const q = query(collection(db, "Answers"));
  const collectionDocs = await getDocs(q);

  collectionDocs.forEach(_doc => {
    deleteDoc(doc(db, "Answers", _doc.id));
  });
}




