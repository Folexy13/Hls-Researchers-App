import "./index.css";
import React, { useState, useEffect } from "react";
import HeaderMenu from "./researchersApp/HeaderMenu";
import TabMenu from "./researchersApp/TabMenu";
import TabContent from "./researchersApp/TabContent";
import Auth from "./auth";
import Podcasts from "./podcasts";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

function App() {
  const [toggleContent, setToggleContent] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check auth status on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("authToken");
      setIsLoggedIn(!!token);
      if (!token) {
        navigate("/login");
      }
    };
    checkAuthStatus();
  }, [navigate]);

  const handleClick = (index) => {
    setToggleContent(index);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false)
    window.location.replace("/login");
  };

  const Home = () => {
    return (
      <div className="container">
        <HeaderMenu onLogout={handleLogout} />
        <TabMenu onTabClick={handleClick} />
        <TabContent toggleContent={toggleContent} onTabClick={handleClick} />
      </div>
    );
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Auth onLoginSuccess={() => setIsLoggedIn(true)} />
            )
          }
        />
        <Route
          path="/podcasts"
          element={isLoggedIn ? <Podcasts /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </div>
  );
}

export default App;