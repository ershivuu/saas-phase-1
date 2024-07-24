import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidenav from "../../TestPages/Sidenav";
import "./AdminDashboard.css";

function AdminDashboard() {
  // State to manage sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: 0,
          padding: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            position: "relative",
            margin: 0,
            height: "85vh",
            width: "100%",
          }}
        >
          <div
            style={{
              maxWidth: isSidebarOpen ? "30%" : "0%",
              flexShrink: 0,
              textAlign: "left",
              overflowY: "auto",
              overflowX: "hidden",
              transition: "max-width 0.3s ease", // Smooth transition
            }}
          >
            <Sidenav isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
          </div>

          <div
            style={{
              flexGrow: 1,
              overflowY: "auto",
              marginLeft: isSidebarOpen ? "150px" : "0px", // Apply margin based on sidebar state
              transition: "margin-left 0.3s ease", // Smooth transition
            }}
          >
            <Outlet />
          </div>
        </div>

        {/* Button to toggle sidebar visibility */}
        <button onClick={toggleSidebar}>
          {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        </button>
      </div>
    </>
  );
}

export default AdminDashboard;
