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
import {
  Typography,
  InputBase,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import { getCompanyData, getActivePlan, registerCompany } from "../../SuperAdminService";

function Management() {
  const [isColumnLayout, setIsColumnLayout] = useState(false); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); 
  const [open, setOpen] = useState(false);
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);

  const [formValues, setFormValues] = useState({
    company_name: "",
    email: "",
    password: "",
    subscription_plan: "",
  });

  const handleColumnLayout = () => setIsColumnLayout(true);
  const handleGridLayout = () => setIsColumnLayout(false);

  const handleClickOpen = () => {
    setFormValues({
      company_name: "",
      email: "",
      password: "",
      subscription_plan: "",
    });
    setOpen(true);
  };

  const handleClose = () => {
    setFormValues("");
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await registerCompany(formValues);
      console.log("Company registered successfully:", formValues);
      setFormValues({
        company_name: "",
        email: "",
        password: "",
        subscription_plan: "",
      });
      handleClose();
     
      const data = await getCompanyData();
      setCompanies(data);
    } catch (err) {
      console.error("Error registering company:", err);
    }
  };

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
        const data = await getCompanyData();
        setCompanies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();
  }, []);

  useEffect(() => {
    const loadSubscriptionPlans = async () => {
      try {
        const data = await getActivePlan();
        setSubscriptionPlans(data); 
      } catch (err) {
        console.error("Error fetching subscription plans:", err);
      }
    };

    loadSubscriptionPlans();
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
          <Button variant="contained" color="success" onClick={handleClickOpen}>
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
                <p>{company.subscription_plan.duration}</p>
                <p>Duration</p>
              </div>
            </div>
          ))}
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Company</DialogTitle>
        <DialogContent>
        
          <TextField
            autoFocus
            margin="dense"
            name="company_name"
            label="Company Name"
            type="text"
            fullWidth
            value={formValues.company_name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={formValues.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={formValues.password}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="subscription_plan"
            label="Subscription Plan"
            select
            fullWidth
            value={formValues.subscription_plan}
            onChange={handleInputChange}
          >
            {subscriptionPlans.map((plan) => (
              <MenuItem key={plan.id} value={plan.id}>
                {plan.plan_name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Management;
