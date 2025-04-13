import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import ProfileView from "./components/ProfileView";
import UserList from "./components/UserList"; // Імпортуємо UserList

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<UserList />} /> {/* Додаємо маршрут */}
        <Route path="/profile/:userUID" element={<ProfileView />} />
      </Routes>
    </Router>
  );
}

export default App;