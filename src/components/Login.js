import { motion } from "framer-motion";
import { auth, googleProvider, db } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const loadUserProfile = async (userUID) => {
  try {
    const userDocRef = doc(db, "profiles", userUID);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.error("Profile not found!");
    }
  } catch (error) {
    console.error("Error loading profile:", error.message);
  }
};

const updateUserProfile = async (userUID, updatedData) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser || currentUser.uid !== userUID) {
      console.error("You are not authorized to update this profile.");
      return;
    }

    const userDocRef = doc(db, "profiles", userUID);
    await updateDoc(userDocRef, updatedData);
    console.log("Profile updated!");
  } catch (error) {
    console.error("Error updating profile:", error.message);
  }
};

const viewUserProfile = async (userUID) => {
  try {
    const userDocRef = doc(db, "profiles", userUID);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data(); // Завжди повертаємо дані профілю
    } else {
      console.error("Profile not found!");
      return null; // Повертаємо null, якщо профіль не знайдено
    }
  } catch (error) {
    console.error("Error viewing profile:", error.message);
    return null; // Повертаємо null у разі помилки
  }
};

function Login() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
      <h1 className="text-6xl font-bold mb-8">Protect Your Data</h1>
      <button className="bg-orange-500 text-white px-6 py-3 rounded-full text-lg">
        Sign in with Google
      </button>
      <Link to="/users" className="mt-4 text-blue-500 underline">
        View All Users
      </Link>
    </div>
  );
}

export default Login;