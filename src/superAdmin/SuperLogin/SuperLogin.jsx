import React, { useState, useEffect } from "react";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Notification from "../../Notification/Notification";
import axios from "axios";
import { SUPER_ADMIN_BASE_URL } from "../../config/config";
import { useNavigate } from "react-router-dom";
import corusviewLogo from "../../assets/logos/corusview.png";

function SuperLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorCount, setErrorCount] = useState(0);
  const [errorNotification, setErrorNotification] = useState({
    open: false,
  });

  const navigate = useNavigate();

  // Function to check token expiration
  const checkTokenExpiration = () => {
    const tokenExpiration =
      JSON.parse(sessionStorage.getItem("TokenExpiration")) ||
      JSON.parse(localStorage.getItem("TokenExpiration"));

    if (tokenExpiration && Date.now() > tokenExpiration) {
      // Token has expired
      sessionStorage.removeItem("Token");
      sessionStorage.removeItem("TokenExpiration");
      localStorage.removeItem("Token");
      localStorage.removeItem("TokenExpiration");
      navigate("/superadmin"); // Redirect to login page
    }
  };

  // Use effect to check token expiration on component mount and set up periodic check
  useEffect(() => {
    checkTokenExpiration(); // Check on mount

    const interval = setInterval(checkTokenExpiration, 60000); // Check every minute

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [navigate]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${SUPER_ADMIN_BASE_URL}/superadmin/login`,
        {
          email: username,
          password: password,
        }
      );

      if (response && response.data.token) {
        const token = response.data.token;
        const expirationTime = Date.now() + 59 * 60 * 1000; // Set expiration time for 59 minutes

        sessionStorage.setItem("Token", JSON.stringify(token));
        sessionStorage.setItem(
          "TokenExpiration",
          JSON.stringify(expirationTime)
        );
        localStorage.setItem("Token", JSON.stringify(token));
        localStorage.setItem("TokenExpiration", JSON.stringify(expirationTime));

        navigate(`/super-admin/super-dashboard`);
        setErrorNotification({
          open: true,
          message: "Login Successful",
        });
      } else {
        setErrorMessage("Invalid credentials");
        setErrorNotification({
          open: true,
          message: "Invalid credentials",
        });
        setErrorCount((prevCount) => prevCount + 1); // Increment error count
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message || "Invalid credentials");
        setErrorNotification({
          open: true,
          message: error.response.data.message || "Invalid credentials",
        });
        setErrorCount((prevCount) => prevCount + 1); // Increment error count
      } else {
        setErrorMessage("An error occurred during login");
        setErrorNotification({
          open: true,
          message: "An error occurred during login",
        });
        setErrorCount((prevCount) => prevCount + 1); // Increment error count
      }
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseNotification = () => {
    setErrorNotification({ ...errorNotification, open: false });
  };

  return (
    <>
      <Notification
        open={errorNotification.open}
        handleClose={handleCloseNotification}
        alertMessage={errorNotification.message}
        alertSeverity="error"
      />
      <div className="login-container">
        <div className="logo-section">
          <a href="/">
            <img className="logo-img" src={corusviewLogo} alt="Logo" />
          </a>
        </div>
        <div style={{ textAlign: "center" }}>
          <p className="login-content"> SUPER ADMIN</p>
        </div>

        <form
          onSubmit={handleFormSubmit}
          className="login-form"
          autoComplete="on"
        >
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`password-input ${
                errorMessage ? "shake-animation input-error" : ""
              }`}
            />
            <span className="password-toggle" onClick={handleTogglePassword}>
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </span>
          </div>

          <div className="btn-login">
            <button type="submit" className="login-button">
              Login
            </button>
          </div>
        </form>
        {error && <p>{error}</p>}
        <div className="design-content">
          <p>Design & Developed By CorusView</p>
        </div>
      </div>
    </>
  );
}

export default SuperLogin;
