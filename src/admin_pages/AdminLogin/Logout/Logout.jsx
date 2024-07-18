import React from "react";
import "./Logout.css";
import medilogo from "../../../assets/logos/medi-logo.png";
import AdminDashboard from "../AdminDashboard/AdminDashboard";

function Logout({ handleLogout }) {
  return (
    <>
      <div className="admin-header fixed-top" >
        <div>
          <img className="admin-logo" src={medilogo} alt="" />
        </div>
        <div id="logout-btn">
          <button
            onClick={() => {
              handleLogout();
              sessionStorage.setItem("isLoggedIn", false);
            }}
          >
            LOGOUT
          </button>
        </div>
      </div>

      <div className="show-dashboard"></div>
    </>
  );
}

export default Logout;
