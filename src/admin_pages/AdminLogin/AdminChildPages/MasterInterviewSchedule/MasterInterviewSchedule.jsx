import React, { useState, useEffect } from "react";
// import Pagination from "@mui/material/Pagination";

import "./MasterInterviewSchedule.css";
import { Pagination } from "react-bootstrap";
import adminApiService from "../../../adminApiService";

function MasterInterviewSchedule() {
  const [jobProfiles, setJobProfiles] = useState([]);
  const [counts, setCounts] = useState([]);
  // const [interviewSchedule, setInterviewSchedule] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminApiService.getAllInterview(
          currentPage,
          itemsPerPage
        );
        // console.log(response, "<<<<<<<check data")
        setJobProfiles(response.jobprofileData);
        setCounts(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

  // useEffect(() => {
  //   const fetchJobProfiles = async () => {
  //     try {
  //       const response = await adminApiService.getJobProfile();
  //       // console.log("response get", response.data);

  //       setJobProfiles(response.data);

  //       response.data.forEach(profile => {
  //         // Assuming profile.publish_to_schedule_interview is a boolean value
  //         // You can modify this if it's a different type
  //         setInterviewSchedule(prevState => ({
  //           ...prevState,
  //           [profile.id]: profile.publish_to_schedule_interview
  //         }));
  //       });

  //     } catch (error) {
  //       console.error('Error fetching job profiles:', error);
  //     }
  //   };

  //   fetchJobProfiles();
  // }, []);

  const [page] = useState(1);
  // const rowsPerPage = 10;

  const handleCheckboxChange = async (index, checked) => {
    try {
      const jobId = jobProfiles[index].id;
      const updatedData = {
        jobprofile_id: jobId,
        publish_to_schedule_interview: checked,
      };
      await adminApiService.updateJobProfile(updatedData);

      const updatedJobProfiles = [...jobProfiles];

      updatedJobProfiles[index].publish_to_schedule_interview = checked;
      setJobProfiles(updatedJobProfiles);
    } catch (error) {
      console.error("Error updating job profile:", error);
    }
  };

  const ScheduledAcademicsTable = jobProfiles.map((profile) => ({
    eligibility_criteria: profile.eligibility_criteria || "N/A",
    department: profile.department_master?.dept_name || "N/A",
    post: profile.applied_post_master?.post_name || "N/A",
    lastDate: profile.last_date_to_apply || "N/A",
    schedule_interview_date_1: profile.schedule_interview_date_1 || "N/A",
    schedule_interview_date_2: profile.schedule_interview_date_2 || "N/A",
    schedule_interview_date_3: profile.schedule_interview_date_3 || "N/A",
    publish_to_schedule_interview: profile.publish_to_schedule_interview,
  }));

  const formatDateForInput = (dateString) => {
    const dateObject = new Date(dateString);
    if (isNaN(dateObject.getTime())) {
      return "";
    }
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObject.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const isDateBeforeToday = (dateString) => {
    const dateObject = new Date(dateString);
    const today = new Date();
    return dateObject < today;
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const ScheduledAcademicData = ScheduledAcademicsTable.slice(
    startIndex,
    endIndex
  );
  const isNextPageAvailable = jobProfiles.length === itemsPerPage;

  const nextPage = () => {
    if (isNextPageAvailable) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSort = (columnName) => {
    if (sortBy === columnName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(columnName);
      setSortOrder("asc");
    }
  };

  const sortedJobProfiles = [...jobProfiles].sort((a, b) => {
    if (sortBy === "department" || sortBy === "post") {
      const fieldA = a[sortBy]?.toLowerCase();
      const fieldB = b[sortBy]?.toLowerCase();
      if (fieldA < fieldB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (fieldA > fieldB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    }
    // Add more cases for sorting other columns if needed
    return 0;
  });

  return (
    <>
      <div className="admin-list">
        <div style={{ marginTop: "30px" }} className="master-table ">
          <p className="SCA-heading">Master Interview Schedule </p>
          {/* <p className="table-des">A descriptive body text comes here</p> */}
          <div className="row sizeofrow">
            <div className="col-md countbox">
              <label className="labelbox">Total JobTypes Count:</label>
              <input
                className="form-control showcountbox"
                disabled
                value={counts?.TotalJobTypesCount || ""}
              />
            </div>
            <div className="col-md countbox">
              <label className="labelbox">Total Vacancy:</label>
              <input
                className="form-control showcountbox"
                disabled
                value={counts?.TotalVacancy || ""}
              />
            </div>
            <div className="col-md countbox">
              <label className="labelbox">Total Active Vacancy:</label>
              <input
                className="form-control showcountbox"
                disabled
                value={counts?.TotalActiveVacancy || ""}
              />
            </div>
          </div>
          <div className="table-responsive fixe-table">
            <table className="table">
              <thead className="thead">
                <tr>
                  <th scope="col">S.No&#x2193;</th>
                  <th scope="col">Department&#x2193;</th>
                  <th scope="col">Post&#x2193;</th>
                  <th scope="col">Eligibility criteria&#x2193;</th>
                  <th scope="col">Day 1&#x2193;</th>
                  <th scope="col">Day 2&#x2193;</th>
                  <th scope="col">Day 3&#x2193;</th>
                  <th scope="col">Add to interview&#x2193;</th>
                </tr>
              </thead>
              <tbody className="tbody">
                {ScheduledAcademicData.map((data, index) => (
                  <tr key={index}>
                    <td>
                      <b>{(currentPage - 1) * itemsPerPage + index + 1}</b>
                    </td>
                    <td>{data.department}</td>
                    <td>{data.post}</td>
                    <td>{data.eligibility_criteria}</td>
                    <td
                      style={{
                        color: isDateBeforeToday(data.schedule_interview_date_1)
                          ? "red"
                          : "inherit",
                      }}
                    >
                      {formatDateForInput(data.schedule_interview_date_1)}
                    </td>
                    <td
                      style={{
                        color: isDateBeforeToday(data.schedule_interview_date_2)
                          ? "red"
                          : "inherit",
                      }}
                    >
                      {formatDateForInput(data.schedule_interview_date_2)}
                    </td>
                    <td
                      style={{
                        color: isDateBeforeToday(data.schedule_interview_date_3)
                          ? "red"
                          : "inherit",
                      }}
                    >
                      {formatDateForInput(data.schedule_interview_date_3)}
                    </td>
                    <td>
                      <label className="switch">
                        <input
                          type="checkbox"
                          id={`checkbox${index}`} // Ensure unique IDs for each checkbox
                          name="publish_to_schedule_interview"
                          checked={data.publish_to_schedule_interview} // Set checked based on the property
                          onChange={() =>
                            handleCheckboxChange(
                              index,
                              !data.publish_to_schedule_interview
                            )
                          } // Toggle the value on change
                        />

                        <span className="slider round"></span>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="row">
              <div className="col-md-4">
                <label>Row:</label>
                <input
                  className="set-row-input "
                  id="specific-input"
                  type="number"
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                />
              </div>
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <Pagination>
                  <Pagination.Prev onClick={prevPage} />
                  <Pagination.Item>{currentPage}</Pagination.Item>
                  <Pagination.Next onClick={nextPage} />
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MasterInterviewSchedule;
