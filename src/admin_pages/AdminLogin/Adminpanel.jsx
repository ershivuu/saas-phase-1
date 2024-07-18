import React, { useState, useEffect } from "react";
import Logout from "./Logout/Logout";
import Login from "./Login/Login";
import "./Adminpanel.css";

function Adminpanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = sessionStorage.getItem("Token");
      const loggedIn = token ? true : false;
      setIsLoggedIn(loggedIn);
    };
    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("Token");
  };
  return (
    <div className="admin-container1">
      <div className="admin-data">
        {!isLoggedIn ? (
          <Login handleLogin={handleLogin} />
        ) : (
          <Logout handleLogout={handleLogout} />
        )}
      </div>
    </div>
  );
}

export default Adminpanel;
