import "./Login.css";
import React, { useState, useEffect } from "react";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../../assets/logos/logo.png";
import Notification from "../../../Notification/Notification";
import axios from "axios";

import { ADMIN_BASE_URL } from "../../../config/config";
import { useNavigate } from "react-router-dom";
import { getHeaderInfo } from "../../../AdminFrontend/FrontendServices";

function Login(handleLogin) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorCount, setErrorCount] = useState(0);
  const [errorNotification, setErrorNotification] = useState({
    open: false,
  });
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { image_url } = await getHeaderInfo();
        setImageUrl(image_url || "");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  // const removeToken = (() => {
  sessionStorage.removeItem("Token");
  localStorage.removeItem("Token");
  // })();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${ADMIN_BASE_URL}/adminLogin/login_admin`,
        {
          login_field: username,
          password: password,
        }
      );
      // console.log(response);
      if (response && response.data.token) {
        sessionStorage.setItem("Token", JSON.stringify(response.data));
        // handleLogin();
        navigate(`/admin-dashboard/dashboard`);
        setErrorNotification({
          open: true,
          message: "Login Successful",
        });
      } else {
        // If response does not contain token (invalid credentials)
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
        // If status code is 400 (Bad Request), it indicates invalid credentials
        setErrorMessage(error.response.data.message || "Invalid credentials");
        setErrorNotification({
          open: true,
          message: error.response.data.message || "Invalid credentials",
        });
        setErrorCount((prevCount) => prevCount + 1); // Increment error count
      } else {
        // If any other error occurs, display a generic error message
        setErrorMessage("An error occurred during login");
        setErrorNotification({
          open: true,
          message: "Invalid credentials",
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
            <img className="logo-img" src={imageUrl} alt="Logo" />
          </a>
        </div>
        <div style={{ textAlign: "center" }}>
          <p className="login-content"> ADMIN PANEL</p>
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
            name=""
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              key={errorCount}
              className={`password-input ${
                errorMessage ? "shake-animation input-error" : ""
              }`}
            />
            <span className="password-toggle" onClick={handleTogglePassword}>
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </span>
          </div>
          {/* <div>
            <a href="/admin_register" className="admin-reg-link">
              Register Admin?
            </a>
          </div> */}
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

export default Login;
