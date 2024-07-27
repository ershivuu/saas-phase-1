import React, { useState, useEffect } from "react";
import "./PlanAndPricing.css";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TableContainer,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { getSubscriptionPlan, updatePlanStatus } from "../../SuperAdminService"; // Adjust the path as needed

function PlanAndPricing() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getSubscriptionPlan();
        setPlans(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleClickOpen = (plan) => {
    setSelectedPlan(plan);
    setStatus(plan.plan_status === 1 ? "Active" : "Inactive"); // Fix: Correctly set the status based on the current plan status
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPlan(null);
  };

  const handleStatusChange = async () => {
    try {
      const updatedStatus = status === "Active" ? 1 : 0; // Fix: Correctly map status to 1 (Active) and 0 (Inactive)
      if (selectedPlan) {
        await updatePlanStatus(selectedPlan.id, updatedStatus);
        // Refresh the plans after update
        const updatedPlans = await getSubscriptionPlan();
        setPlans(updatedPlans);
        handleClose();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="pricing-table">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sr. No</TableCell>
              <TableCell>Plan Name</TableCell>
              <TableCell>Duration (Days)</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plans.map((plan, index) => (
              <TableRow key={plan.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{plan.plan_name}</TableCell>
                <TableCell>{plan.duration} days</TableCell>
                <TableCell>
                  <span
                    style={{
                      color: plan.plan_status === 1 ? "green" : "red",
                    }}
                    onClick={() => handleClickOpen(plan)}
                  >
                    {plan.plan_status === 1 ? "Active" : "Inactive"}
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="outlined">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Status</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Status"
            type="text"
            fullWidth
            variant="standard"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            select
            SelectProps={{
              native: true,
            }}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleStatusChange}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PlanAndPricing;
