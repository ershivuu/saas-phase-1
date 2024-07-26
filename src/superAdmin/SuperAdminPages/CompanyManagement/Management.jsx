import React, { useState, useEffect } from "react";
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
import SearchIcon from "@mui/icons-material/Search";
import { Typography, InputBase, Button } from "@mui/material";
import { fetchCompanyData } from "../../SuperAdminService";

function Management() {
  const [isColumnLayout, setIsColumnLayout] = useState(false); // State to manage layout
  const [searchTerm, setSearchTerm] = useState(""); // State to manage search input
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // State to manage filter

  const handleColumnLayout = () => setIsColumnLayout(true);
  const handleGridLayout = () => setIsColumnLayout(false);

  const buttonStyle = (view) => ({
    backgroundColor:
      !isColumnLayout && view === "grid"
        ? "green"
        : isColumnLayout && view === "column"
        ? "green"
        : "transparent",
    color:
      !isColumnLayout && view === "grid"
        ? "white"
        : isColumnLayout && view === "column"
        ? "white"
        : "inherit",
    borderRadius: "4px",
    padding: "5px",
  });

  const companyListStyle = {
    display: "flex",
    flexDirection: isColumnLayout ? "column" : "row",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "20px",
  };

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const data = await fetchCompanyData();
        setCompanies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredCompanies = companies.filter((company) => {
    if (filter === "all") return true;
    if (filter === "active") return company.is_active;
    if (filter === "inactive") return !company.is_active;
    if (filter === "paid") return company.is_paid;
    return true;
  });

  return (
    <>
      <div className="page-header">
        <div className="search-container">
          <InputBase
            placeholder="Search…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <SearchIcon className="search-icon" />
        </div>
        <div className="add-company-btn">
          <Button variant="contained" color="success">
            Add Company
          </Button>
        </div>
        <div className="view-btns">
          <Typography>View</Typography>
        </div>

        <div>
          <IconButton style={buttonStyle("grid")} onClick={handleGridLayout}>
            <ViewModuleIcon />
          </IconButton>
        </div>
        <div>
          <IconButton
            style={buttonStyle("column")}
            onClick={handleColumnLayout}
          >
            <ViewListIcon />
          </IconButton>
        </div>
      </div>
      <div className="company-status">
        <div className="status-card" onClick={() => setFilter("all")}>
          <div className="status-img">
            <img src={bluebag} alt="" />
          </div>
          <div>
            <p>Total Company</p>
            <p>{companies.length}</p>
          </div>
        </div>
        <div className="status-card" onClick={() => setFilter("active")}>
          <div className="status-img">
            <img src={greenbag} alt="" />
          </div>
          <div>
            <p>Active Company</p>
            <p>{companies.filter((company) => company.is_active).length}</p>
          </div>
        </div>
        <div className="status-card" onClick={() => setFilter("inactive")}>
          <div className="status-img">
            <img src={redbag} alt="" />
          </div>
          <div>
            <p>Inactive Company</p>
            <p>{companies.filter((company) => !company.is_active).length}</p>
          </div>
        </div>
        <div className="status-card" onClick={() => setFilter("paid")}>
          <div className="status-img">
            <img src={yellowbag} alt="" />
          </div>
          <div>
            <p>Paid Company</p>
            <p>{companies.filter((company) => company.is_paid).length}</p>
          </div>
        </div>
      </div>
      <div className="company-list" style={companyListStyle}>
        {filteredCompanies
          .filter((company) =>
            company.company_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          )
          .map((company) => (
            <div key={company.id} className="company-details">
              <div className="all-details">
                <div className="company-logo">
                  <img src={bluebag} alt="" />
                </div>
                <div className="company-other-details">
                  <p>{company.company_name}</p>
                  <p>
                    {company.subdomain
                      ? `Subdomain: ${company.subdomain}`
                      : "No Subdomain"}
                  </p>
                  <p>
                    Reg.Date:
                    <span>
                      {new Date(
                        company.subscription_plan.start_date
                      ).toLocaleDateString()}
                    </span>
                  </p>
                  <p>
                    Plan Expiry Date:
                    <span>
                      {new Date(
                        company.subscription_plan.end_date
                      ).toLocaleDateString()}
                    </span>
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
                <p>{company.subscription_plan.plan_name}</p>
                <p>Plan Name</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Management;
