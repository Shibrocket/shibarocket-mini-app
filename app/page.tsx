"use client";

import { useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function Home() {
  useEffect(() => {
    const testDoc = doc(db, "testCollection", "testDoc");

    setDoc(testDoc, { test: "Hello from ShibaRocket" })
      .then(() => console.log("Successfully wrote to Firestore!"))
      .catch((error) => console.error("Error writing to Firestore:", error));
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-3xl">Check Termux console for Firebase test result!</h1>
    </div>
  );
}
