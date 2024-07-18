import React, { useState } from "react";
import "./Sidenav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CandidateHeader from "../../candidate_pages/CandidateLogin/CandidateHeader/CandidateHeader";
// import Footers from "../../components/Footer/Footers";
import {
  faIdCardClip,
  faBuildingColumns,
  faBriefcase,
  
} from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet } from "react-router-dom";
const Sidenav = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <>
      <CandidateHeader></CandidateHeader>
      <div id="wrapper" className={isToggled ? "toggled" : ""}>
        <aside id="sidebar-wrapper">
          <ul className="sidebar-nav">
            <li className="active">
              <Link to="/">
                <i className="fa fa-home side-icon">
                  <FontAwesomeIcon
                    className="set-menu-icon"
                    icon={faIdCardClip}
                  />
                </i>
                Personal Details
              </Link>
            </li>
            <li>
              <Link to="/candidate-dashboard/personal-qualification">
                <i className="fa fa-plug side-icon">
                  <FontAwesomeIcon
                    className="set-menu-icon"
                    icon={faBuildingColumns}
                  />
                </i>
                Academic Professional Qualifications
              </Link>
            </li>
            <li>
              <Link to="/candidate-dashboard/personal-experience">
                <i className="fa fa-user side-icon">
                  <FontAwesomeIcon
                    className="set-menu-icon"
                    icon={faBriefcase}
                  />
                </i>
                UsExperienceers
              </Link>
            </li>
          </ul>
        </aside>

        <div id="navbar-wrapper">
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <a
                  href="#"
                  className="navbar-brand"
                  id="sidebar-toggle"
                  onClick={handleToggle}
                >
                  <i className="fa fa-bars">=</i>
                </a>
              </div>
            </div>
          </nav>
        </div>

        <section id="content-wrapper">
          <Outlet />
        </section>
      </div>
    </>
  );
};

export default Sidenav;
