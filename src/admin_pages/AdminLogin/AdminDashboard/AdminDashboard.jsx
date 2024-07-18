import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import "./AdminDashboard.css";
// import AdminAuthRoutes from "../../../routes/AdminAuthRoutes";
// import Sidenav from "../../TestPages/Sidenav";
import AdminHeader from "../admin_header/AdminHeader";
import Dashboard from "./Dashboard";

// import { Container, Row, Col, Card } from "react-bootstrap";

function AdminDashboard() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // const totalInterviews = 50;
  // const totalApplies = 200;
  // const totalProfiles = 1000;
  // const totalOpenings = 20;
  // const adminDetails = {
  //   name: "John Doe",
  //   email: "admin@example.com",
  //   role: "Admin",
  // };

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
            position: "sticky",
            top: 0,
            zIndex: 50,
            height: "5em",
            width: "100%",
            margin: 0,
            padding: 0,
          }}
        >
          <AdminHeader />
        </div>
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
              maxWidth: "30%",
              flexShrink: 0,
              textAlign: "left",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <SideBar />
          </div>

          {/* <div>
            <main>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames
                      .slice(0, index + 1)
                      .join("/")}`;
                    const isLast = index === pathnames.length - 1;
                    return (
                      <li
                        className="breadcrumb-item"
                        style={{ marginLeft: "15px" }}
                        key={routeTo}
                      >
                        {isLast ? (
                          <span>{name}</span>
                        ) : (
                          <Link to={routeTo}>{name}</Link>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </nav>
            </main>
          </div> */}

          <div style={{ flexGrow: 1, overflowY: "auto" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminDashboard;
