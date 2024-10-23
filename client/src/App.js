import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Team from "./pages/Team";
import MyTeam from "./pages/MyTeam";
import ProtectedRoute from "./ProtectedRoute"; // Import the ProtectedRoute
import { ToastContainer } from "react-toastify";

import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protect these routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/team"
            element={
              <ProtectedRoute>
                <Team />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myteam"
            element={
              <ProtectedRoute>
                <MyTeam />
              </ProtectedRoute>
            }
          />

          {/* Redirect any undefined routes */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
