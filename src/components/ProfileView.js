import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

const ProfileView = ({ userUID }) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userDocRef = doc(db, "profiles", userUID);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setProfile(userDoc.data());
        } else {
          setError("Profile not found!");
        }
      } catch (err) {
        setError("Error loading profile: " + err.message);
      }
    };

    fetchProfile();
  }, [userUID]);

  const handleAddToContacts = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        alert("You need to log in to add contacts.");
        return;
      }

      const currentUserDocRef = doc(db, "profiles", currentUser.uid);
      const currentUserDoc = await getDoc(currentUserDocRef);

      if (currentUserDoc.exists()) {
        const currentContacts = currentUserDoc.data().contacts || [];
        if (!currentContacts.includes(userUID)) {
          await updateDoc(currentUserDocRef, {
            contacts: [...currentContacts, userUID],
          });
          alert("User added to contacts!");
        } else {
          alert("User is already in your contacts.");
        }
      }
    } catch (err) {
      console.error("Error adding to contacts:", err.message);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-view">
      <h1>{profile.name}</h1>
      <p>Email: {profile.email}</p>
      <p>Phone: {profile.phone}</p>
      <button onClick={handleAddToContacts}>Add to Contacts</button>
    </div>
  );
};

export default ProfileView;