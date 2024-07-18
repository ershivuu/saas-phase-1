import React, { useState, useEffect } from "react";
import "./adminHeader.css";
import medilogo from "../../../assets/logos/medi-logo.png";
import logout from "../../../assets/logos/Logout.png";
import { useNavigate } from "react-router-dom";
import { getHeaderInfo } from "../../../AdminFrontend/FrontendServices";
function AdminHeader() {
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
  const handleLogout = () => {
    sessionStorage.removeItem("Token");
    sessionStorage.removeItem("isLoggedIn");
    navigate("/admin-login");
  };
  return (
    <>
      <div className="admin-header fixed-top">
        <div>
          <img className="admin-logo" src={imageUrl} alt="" />
        </div>
        <div id="logout-btn">
          <button onClick={() => handleLogout()}>
            <img src={logout} alt="" />
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminHeader;
