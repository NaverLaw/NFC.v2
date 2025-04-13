// filepath: c:\my-profile-site-61e2f1af4533a872439f2b3858bcfda68673d64d\src\components\UserList.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "profiles");
        const userDocs = await getDocs(usersCollection);
        const userList = userDocs.docs.map((doc) => ({
          uid: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.uid}>
            <p>{user.name || "No Name"}</p>
            <Link to={`/profile/${user.uid}`}>View Profile</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;