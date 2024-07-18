import React from "react";
import "./MasterJobProfile.css";

import { Outlet, Link } from "react-router-dom";

function MasterJobProfile() {
 
  return (
    <>


    
    {/* {isButtonVisible && (
      <div className="new-opening-btn">
        <button>
          <Link
            className="new-opening-btn-link"
            to="/admin-dashboard/job-profile/add-jobprofiles"
          >
            Add New Job Profiles
          </Link>
        </button>
      </div>
    )} */}
    <div className="center-container">
      <div className="admin-list">
        <Outlet />
      </div>
    </div>
  </>
  );
}

export default MasterJobProfile;
