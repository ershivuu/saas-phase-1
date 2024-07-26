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
} from "@mui/material";
import { getSubscriptionPlan } from "../../SuperAdminService"; // Adjust the path as needed

function PlanAndPricing() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
                      color: plan.plan_status === 0 ? "green" : "red",
                    }}
                  >
                    {plan.plan_status === 0 ? "Active" : "Inactive"}
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
    </div>
  );
}

export default PlanAndPricing;
