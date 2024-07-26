import React, { useState, useEffect } from "react";
import "./SuperDash.css";
import profilePhoto from "../../../assets/images/superadmin.png";

function SuperDash() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array to run effect only once

  const formatDate = (date) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const monthsOfYear = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = monthsOfYear[date.getMonth()];
    const year = date.getFullYear();

    return `${dayOfWeek}, ${dayOfMonth} ${month}, ${year}`;
  };

  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    const strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
    return strTime;
  };

  return (
    <>
      <div className="registered-companies">
        <div className="welcome-card">
          <div className="profile-detail">
            <div className="profile-photo">
              <img src={profilePhoto} alt="" />
            </div>
            <div className="profile-name">
              <p>Welcome</p>
              <p>Super Admin</p>
            </div>
          </div>
          <div className="login-time">
            <div className="date">
              <p>Date:</p>
              <p>{formatDate(currentTime)}</p>
            </div>
            <div className="time">
              <p>Time:</p>
              <p>{formatTime(currentTime)}</p>
            </div>
          </div>
        </div>
        <div className="total-company">
          <div className="super-card-head">
            <p>Total Company</p>
            <p>314</p>
          </div>
          <div className="super-card-details">
            <div>
              <p>Paid Companies</p>
              <p>41</p>
            </div>
            <div>
              <p>Unpaid companies</p>
              <p>278</p>
            </div>
            <div>
              <p>Inactive companies</p>
              <p>315</p>
            </div>
          </div>
        </div>
        <div className="total-user">
          <div className="super-card-head">
            <p>Total User</p>
            <p>314</p>
          </div>
          <div className="super-card-details">
            <div>
              <p>Paid User</p>
              <p>41</p>
            </div>
            <div>
              <p>Unpaid User</p>
              <p>278</p>
            </div>
            <div>
              <p>Inactive User</p>
              <p>315</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuperDash;
