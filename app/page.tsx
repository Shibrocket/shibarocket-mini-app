"use client";
import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import { firebaseConfig } from "../firebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export default function Home() {
  useEffect(() => {
    const testFirebase = async () => {
      try {
        // Sign in anonymously
        await signInAnonymously(auth);
        console.log("Signed in anonymously");

        // Perform Firestore write
        await setDoc(doc(db, "testCollection", "testDoc"), {
          test: "Hello from ShibaRocket",
        });
        console.log("Successfully wrote to Firestore!");
      } catch (error) {
        console.error("Error writing to Firestore:", error.message);
      }
    };

    testFirebase();
  }, []);

  return <div>Check browser console for Firebase test result!</div>;
}
