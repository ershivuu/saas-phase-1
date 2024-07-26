import React from "react";
import "./Management.css";
import bluebag from "../../../assets/logos/superadmin/blue.png";
import greenbag from "../../../assets/logos/superadmin/green.png";
import redbag from "../../../assets/logos/superadmin/red.png";
import yellowbag from "../../../assets/logos/superadmin/yellow.png";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { Typography } from "@mui/material";

function Management() {
  return (
    <>
      <div className="page-header">
        <div className="view-btns">
          <Typography>View</Typography>
        </div>
        <div>
          <IconButton>
            <ViewListIcon />
          </IconButton>
        </div>
        <div>
          <IconButton>
            <ViewModuleIcon />
          </IconButton>
        </div>
      </div>
      <div className="company-status">
        <div className="status-card">
          <div className="status-img">
            <img src={bluebag} alt="" />
          </div>
          <div>
            <p>Total Company</p>
            <p>314</p>
          </div>
        </div>
        <div className="status-card">
          <div className="status-img">
            <img src={greenbag} alt="" />
          </div>
          <div>
            <p>Active Company</p>
            <p>314</p>
          </div>
        </div>
        <div className="status-card">
          <div className="status-img">
            <img src={redbag} alt="" />
          </div>
          <div>
            <p>Incative Company</p>
            <p>314</p>
          </div>
        </div>
        <div className="status-card">
          <div className="status-img">
            <img src={yellowbag} alt="" />
          </div>
          <div>
            <p>Paid Company</p>
            <p>314</p>
          </div>
        </div>
      </div>
      <div className="company-list">
        <div className="company-details">
          <div className="all-details">
            <div className="company-logo">
              <img src={bluebag} alt="" />
            </div>
            <div className="company-other-details">
              <p>Corusview IT Services</p>
              <p>Product based company</p>
              <p>
                Reg.Date: <span>19-july-2024</span>
              </p>
              <p>
                Plan Expiry Date: <span>19-july-2024</span>
              </p>
            </div>
            <div className="del-buttons">
              <IconButton color="error" aria-label="delete">
                <DeleteIcon />
              </IconButton>

              <IconButton color="primary" aria-label="view">
                <VisibilityIcon />
              </IconButton>
            </div>
          </div>
          <div className="current-plan">
            <p>Premium</p>
            <p>Plan Name</p>
          </div>
        </div>
        <div className="company-details">
          <div className="all-details">
            <div className="company-logo">
              <img src={bluebag} alt="" />
            </div>
            <div className="company-other-details">
              <p>Corusview IT Services</p>
              <p>Product based company</p>
              <p>
                Reg.Date: <span>19-july-2024</span>
              </p>
              <p>
                Plan Expiry Date: <span>19-july-2024</span>
              </p>
            </div>
            <div className="del-buttons">
              <IconButton color="error" aria-label="delete">
                <DeleteIcon />
              </IconButton>

              <IconButton color="primary" aria-label="view">
                <VisibilityIcon />
              </IconButton>
            </div>
          </div>
          <div className="current-plan">
            <p>Premium</p>
            <p>Plan Name</p>
          </div>
        </div>
        <div className="company-details">
          <div className="all-details">
            <div className="company-logo">
              <img src={bluebag} alt="" />
            </div>
            <div className="company-other-details">
              <p>Corusview IT Services</p>
              <p>Product based company</p>
              <p>
                Reg.Date: <span>19-july-2024</span>
              </p>
              <p>
                Plan Expiry Date: <span>19-july-2024</span>
              </p>
            </div>
            <div className="del-buttons">
              <IconButton color="error" aria-label="delete">
                <DeleteIcon />
              </IconButton>

              <IconButton color="primary" aria-label="view">
                <VisibilityIcon />
              </IconButton>
            </div>
          </div>
          <div className="current-plan">
            <p>Premium</p>
            <p>Plan Name</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Management;
