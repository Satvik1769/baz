import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

import "./App.css";
import Team from "./pages/Team";
import MyTeam from "./pages/MyTeam";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/team" element={<Team />} />
          <Route path="/myteam" element={<MyTeam />} />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
