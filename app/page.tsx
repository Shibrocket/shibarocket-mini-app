"use client";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Remove FirebaseError
import { firebaseConfig } from "../firebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const testFirebase = async () => {
      try {
        await signInWithEmailAndPassword(auth, "shibarocket72@gmail.com", "Emumena98");
        console.log("Signed in with Email/Password");

        await setDoc(doc(db, "testCollection", "testDoc"), {
          test: "Hello from ShibaRocket",
        });
        console.log("Successfully wrote to Firestore!");
      } catch (error: any) { // Revert to any with optional ESLint disable
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        console.error("Error:", error.message);
      }
    };

    testFirebase();
  }, []);

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button
        onClick={async () => {
          try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Signed in!");
          } catch (error: any) { // ESLint disable optional here too
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            console.error("Login Error:", error.message);
          }
        }}
      >
        Login
      </button>
      <p>Check browser console for Firebase test result!</p>
    </div>
  );
}
