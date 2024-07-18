import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./MasterCurrentOpening.css";


function MasterCurrentOpening() {
  const isButtonVisible = true;

  return (
    <>


    
      {isButtonVisible && (
        <div className="new-opening-btn">
          <button>
            <Link
              className="new-opening-btn-link"
              to="/admin-dashboard/current-openings/add-openings"
            >
              Add New Openings
            </Link>
          </button>
        </div>
      )}
      <div className="center-container">
        <div className="admin-list">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MasterCurrentOpening;
