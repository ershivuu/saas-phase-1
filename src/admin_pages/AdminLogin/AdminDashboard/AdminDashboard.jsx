import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import "./AdminDashboard.css";

import AdminHeader from "../admin_header/AdminHeader";
import Dashboard from "./Dashboard";
import Sidenav from "../../TestPages/Sidenav";

function AdminDashboard() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };
  return (
    <>
      <div
      // style={{
      //   display: "flex",
      //   flexDirection: "column",
      //   margin: 0,
      //   padding: 0,
      // }}
      >
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            position: "relative",
            margin: 0,
            height: "100vh",
            width: "100%",
          }}
        >
          <div
            style={{
              maxWidth: "30%",
              flexShrink: 0,
              textAlign: "left",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <Sidenav isOpen={isSidebarOpen} onToggle={toggleSidebar} />
          </div>

          <div
            style={{
              flexGrow: 1,
              overflowY: "auto",
              marginLeft: isSidebarOpen ? "0px" : "150px",
              transition: "margin-left 0.3s ease",
              marginTop: "50px",
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminDashboard;
