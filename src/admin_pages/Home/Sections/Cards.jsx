import React, { useState, useEffect } from "react";

import logo1 from "../../../assets/logos/academic.png";
import logo2 from "../../../assets/logos/research.png";
import logo3 from "../../../assets/logos/administration.png";
import { getSection1Data } from "../../../AdminFrontend/FrontendServices";

function Cards() {
  const [section1Data, setSection1Data] = useState({
    id: "",
    heading_L1: "",
    heading_L2: "",
    heading_L3: "",
  });
  const fetchSection1Data = async () => {
    try {
      const data = await getSection1Data();
      setSection1Data(data);
    } catch (error) {
      console.error("Error fetching Section 1 data:", error);
    }
  };
  useEffect(() => {
    fetchSection1Data();
  }, []);
  return (
    <div>
      <div className="subs">
        <p>{section1Data.heading_L1}</p>
        <p>{section1Data.heading_L2}</p>
        <p>{section1Data.heading_L3}</p>
      </div>

      <div className="cards">
        <div className="card">
          <img alt="" src={logo1} />
          <p>ACADEMICS</p>
          <a href="/current-opening">View Vacancies</a>
        </div>
        <div className="card">
          <img alt="" src={logo2} />
          <p>UAS</p>

          <a href="/current-opening">View Vacancies</a>
        </div>
        <div className="card">
          <img alt="" src={logo2} />
          <p>RESEARCH</p>
          <a href="/current-opening">View Vacancies</a>
        </div>
        <div className="card">
          <img alt="" src={logo3} />
          <p>ADMINISTRATION</p>
          <a href="/current-opening">View Vacancies</a>
        </div>
        <div className="card">
          <img alt="" src={logo3} />
          <p>TECHNICAL</p>
          <a href="/current-opening">View Vacancies</a>
        </div>
      </div>
    </div>
  );
}

export default Cards;
