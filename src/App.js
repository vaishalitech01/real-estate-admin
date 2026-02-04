import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import Home from "./screens/Home";
import SatyamDeveloper from "./screens/SatyamDeveloper";
import ThereachAddress from "./screens/ThreachAddress";
import GodrejVaranya from "./screens/GodrejVaranya";
import PWAInstallPrompt from "./components/PWAInstallPrompt";

function App() {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    // Register service worker for PWA functionality
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then((registration) => {
            console.log('PWA: Service Worker registered successfully:', registration.scope);
          })
          .catch((error) => {
            console.log('PWA: Service Worker registration failed:', error);
          });
      });
    }
  }, []);

  return (
    <>
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
               <Route path="godrejVaranya" element={<GodrejVaranya/>} />
          </Route>
        ) : (
          <Route path="/dashboard/*" element={<Navigate to="/" />} />
        )}

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      
      {/* PWA Install Prompt - shows on mobile when conditions are met */}
      <PWAInstallPrompt />
    </>
  );
}

export default App;
