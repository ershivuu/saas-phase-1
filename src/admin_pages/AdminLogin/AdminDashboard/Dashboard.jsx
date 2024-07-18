import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
// import { LineChart } from "@mui/x-charts/LineChart";
import calanderlogo from "../.../../../../assets/logos/calendar-white.png";
import Applylogo from "../.../../../../assets/logos/apply-white.png";
import Userlogo from "../.../../../../assets/logos/user-white.png";
import messagelogo from "../.../../../../assets/logos/email-white.png";
import adminApiService from "../../adminApiService";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
function Dashboard() {
  const [containerWidth, setContainerWidth] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      setContainerWidth(document.querySelector(".graphChart").clientWidth);
    };

    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [allCounts, setAllCounts] = useState("");
  const fetchAllCount = async () => {
    try {
      const response = await adminApiService.getAllCounts();
      console.log("all counts>>", response);

      setAllCounts(response);
    } catch (error) {
      console.error("Error fetching visitor details:", error);
    }
  };
  useEffect(() => {
    fetchAllCount();
  }, []);

  const data = [
    { month: "January", interviews: 10, candidates: 20, visitors: 15 },
    { month: "February", interviews: 5, candidates: 6, visitors: 25 },
    { month: "March", interviews: 5, candidates: 10, visitors: 5 },
    { month: "April", interviews: 50, candidates: 12, visitors: 10 },
    { month: "May", interviews: 70, candidates: 8, visitors: 12 },
    { month: "June", interviews: 40, candidates: 9, visitors: 8 },
    { month: "July", interviews: 20, candidates: 25, visitors: 36 },
    { month: "August", interviews: 5, candidates: 15, visitors: 16 },
    { month: "September", interviews: 54, candidates: 18, visitors: 46 },
    { month: "October", interviews: 4, candidates: 9, visitors: 6 },
    { month: "November", interviews: 0, candidates: 85, visitors: 46 },
    { month: "December", interviews: 40, candidates: 5, visitors: 6 },
  ];

  return (
    <>
      <div style={{ marginTop: "80px" }}>
        <div className="details">
          <div className="detail-card">
            <div className="info">
              <img src={calanderlogo} alt="" />
            </div>
            <div className="info">
              <p>Interview Schedules</p>
              <p>{allCounts.totalActiveIntervew}</p>
            </div>
          </div>
          <div className="detail-card">
            <div className="info">
              <img src={Applylogo} alt="" />
            </div>
            <div className="info">
              <p>Vacancy</p>
              <p>{allCounts.totalActiveVacancy}</p>
            </div>
          </div>
          <div className="detail-card">
            <div className="info">
              <img src={Userlogo} alt="" />
            </div>
            <div className="info">
              <p>No. Of Candidates</p>
              <p>{allCounts.totalCandidate}</p>
            </div>
          </div>
          <div className="detail-card">
            <div className="info">
              <img src={messagelogo} alt="" />
            </div>
            <div className="info">
              <p>Vacancy Type</p>
              <p>{allCounts.totalActiveOpenings}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="graphChart"
        style={{ width: "100%", maxWidth: "1100px", margin: "0 auto" }}
      >
        <h2>Interviews and Candidates</h2>
        <LineChart width={containerWidth} height={350} data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <CartesianGrid strokeWidth={4} stroke="#eee" strokeDasharray="5 5" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="interviews"
            name="First Interviews"
            stroke="rgba(0, 0, 255, 0.8)"
            strokeWidth={3}
            filter="url(#glow)"
          />

          <Line
            type="monotone"
            dataKey="candidates"
            name="Candidates Applied"
            stroke="rgba(128, 0, 0, 0.8)"
            strokeWidth={3}
            filter="url(#glow)"
          />

          <Line
            type="monotone"
            dataKey="visitors"
            name="Total Visitors"
            stroke="yellow"
            strokeWidth={3}
            filter="url(#glow)"
          />

          <defs>
            <filter
              id="glow"
              x="-5000%"
              y="-5000%"
              width="10000%"
              height="10000%"
            >
              <feGaussianBlur stdDeviation="1" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </LineChart>
      </div>
    </>
  );
}

export default Dashboard;
