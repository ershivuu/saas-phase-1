import React from "react";
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

function PlanAndPricing() {
  // Sample data (you can replace this with actual data from your application)
  const plans = [
    { id: 1, planName: "Plan A", duration: 30, status: "Active" },
    { id: 2, planName: "Plan B", duration: 60, status: "Inactive" },
    { id: 3, planName: "Plan C", duration: 90, status: "Active" },
  ];

  return (
    <>
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
                  <TableCell>{plan.planName}</TableCell>
                  <TableCell>{plan.duration} days</TableCell>
                  <TableCell>
                    {/* Apply conditional styles based on plan status */}
                    <span
                      style={{
                        color: plan.status === "Active" ? "green" : "red",
                      }}
                    >
                      {plan.status}
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
    </>
  );
}

export default PlanAndPricing;
