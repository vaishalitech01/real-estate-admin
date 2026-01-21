import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import Home from "./screens/Home";
import SatyamDeveloper from "./screens/SatyamDeveloper";
import ThereachAddress from "./screens/ThreachAddress";
import LodhaDevelopers from "./screens/LodhaDevelopers";

function App() {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return (
    <Routes>
      {/* Home route */}
      <Route 
        path="/" 
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <Home />} 
      />

      {/* Dashboard routes - only accessible when logged in */}
      {isLoggedIn ? (
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="satyamDeveloper" />} />
           <Route path="satyamDeveloper" element={<SatyamDeveloper/>} />
            <Route path="thereachAddress" element={<ThereachAddress/>} />
             <Route path="lodhaDevelopers" element={<LodhaDevelopers/>} />
        </Route>
      ) : (
        <Route path="/dashboard/*" element={<Navigate to="/" />} />
      )}

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
