import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";
import { Button } from "react-bootstrap";
import adminApiService from "../../adminApiService";
import "./Reports.css";
import Notification from "../../../Notification/Notification";

// import updatebtn from "../../../assets/logos/update.png";
import updatebtn from "../../../assets/logos/view.png";
import viewbtn from "../../../assets/logos/view-resume.png";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
function Reports() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPost, setSelectedPost] = useState("");
  const selectedSubpost = "";
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [count, setCount] = useState([]);
  const [page] = useState(1);
  // const [categories, setCategories] = useState([]);
  // const [posts, setPosts] = useState([]);
  // const [subposts, setSubposts] = useState([]);
  // const [showPdfModal, setShowPdfModal] = useState(false);
  const [showPdfDialog, setShowPdfDialog] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingPopup, setLoadingPopup] = useState(true);
  const [jobCategories, setJobCategories] = useState([]);
  const [post, setPost] = useState([]);

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationSeverity, setNotificationSeverity] = useState("error");
  const [notificationMessage, setNotificationMessage] = useState("");

  const fetchDataFromService = async () => {
    try {
      const response = await adminApiService.fetchData(
        currentPage,
        itemsPerPage,
        selectedCategory,
        selectedPost
      );

      // console.log("check count ", response);
      setData(response.candidateappliedpostData);
      setCount(response);

      // const uniqueCategories = [
      //   ...new Set(
      //     response.candidateappliedpostData.map(
      //       (candidate) => candidate.job_category_master?.category_name
      //     )
      //   ),
      // ];
      // setCategories(uniqueCategories);
      // setPosts(
      //   response.candidateappliedpostData.map(
      //     (candidate) => candidate.applied_post_master?.post_name
      //   )
      // );
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDataFromService();
  }, [
    currentPage,
    selectedCategory,
    selectedPost,
    selectedSubpost,
    itemsPerPage,
  ]);
  useEffect(() => {
    const fetchJobCategories = async () => {
      try {
        const response = await adminApiService.getJobCategories();
        setJobCategories(response.data);
        // console.log("response.data", response.data);
      } catch (error) {
        console.error("Error fetching job categories:", error);
      }
    };

    fetchJobCategories();
  }, []);

  // const handleCategoryChange = (e) => {
  //   const selectedCategory = e.target.value;
  //   setSelectedCategory(selectedCategory);

  //   setSelectedPost('');
  //   setSelectedSubpost('');
  // };

  // const handlePostChange = (e) => {
  //   const selectedPost = e.target.value;
  //   setSelectedPost(selectedPost);
  //   setSelectedSubpost('');
  // };

  // const handleSubpostChange = (e) => {
  //   setSelectedSubpost(e.target.value);
  //   setCurrentPage(1);
  // };

  const handleResumeClick = async (candidateId) => {
    try {
      const resumeData = await adminApiService.renderCandidateResume(
        candidateId
      );
      if (resumeData.type === "application/pdf") {
        const url = window.URL.createObjectURL(resumeData);
        setPdfUrl(url);
        setShowPdfDialog(true); // Open dialog when PDF is fetched
      } else {
        setNotificationMessage("No resume available for this candidate.");
        setNotificationSeverity("error");
        setShowNotification(true);
      }
    } catch (error) {
      console.error("Error fetching resume:", error);

      setNotificationMessage("Error fetching resume.");
      setNotificationSeverity("error");
      setShowNotification(true);
    }
  };

  const handleClosePdfDialog = () => {
    setShowPdfDialog(false); // Close dialog
  };

  // const handleCandidateInfoClick = (candidate) => {
  //   console.log("Selected Candidate Data:", candidate);
  //   setSelectedCandidate(candidate.id);
  // };

  const handleCategory = (fieldName, value) => {
    const selectedCategoryData = jobCategories.find(
      (category) => category.category_name === value
    );
    setSelectedCategory(value);
    // setUpdateField((prevValues) => ({
    //   ...prevValues,
    //   [fieldName]: value.toString(),
    //   job_category_master_id: selectedCategoryData
    //     ? selectedCategoryData.id
    //     : "",
    // }));
    // setFormValues((prevValues) => ({
    //   ...prevValues,
    //   [fieldName]: value,
    //   job_category_master_id: selectedCategoryData
    //     ? selectedCategoryData.id
    //     : "",
    // }));
    const selectedPostData =
      selectedCategoryData &&
      selectedCategoryData.applied_post_masters.map((post) => post.post_name);
    setPost(selectedPostData || []);
    setSelectedPost("");
    // setSubPost([]);
  };

  const handlePost = (fieldName, value) => {
    if (selectedCategory === "") {
      return;
    }

    // const selectedPostObject = jobCategories
    //   .find((category) => category.category_name === selectedCategory)
    //   .applied_post_masters.find((post) => post.post_name === value);
    // const selectedSubPostData =
    //   selectedPostObject &&
    //   selectedPostObject.applied_subpost_masters.map(
    //     (subpost) => subpost.subpost_name
    //   );
    setSelectedPost(value);
    // setUpdateField((prevValues) => ({
    //   ...prevValues,
    //   [fieldName]: value.toString(),
    //   applied_post_masters_id: selectedPostObject ? selectedPostObject.id : "",
    // }));
    // setFormValues((prevValues) => ({
    //   ...prevValues,
    //   [fieldName]: value,
    //   applied_post_masters_id: selectedPostObject ? selectedPostObject.id : "",
    // }));
    // setSubPost(selectedSubPostData || []);
  };

  const fetchCandidateDetails = async (candidateId, signal) => {
    try {
      setLoadingPopup(true);

      const response = await adminApiService.getCandidatesById(
        candidateId,
        signal
      );

      // console.log("getCandidatesById>>", response.data);
      setSelectedCandidate(response.data);
      setLoadingPopup(false);
    } catch (error) {
      console.error("Error fetching candidate details:", error);
      setLoadingPopup(false);
    }
  };

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

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const ReportsData = data.slice(startIndex, endIndex);
  const isNextPageAvailable = data.length === itemsPerPage;
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
  // useEffect(() => {
  //   console.log("Selected Candidate:", selectedCandidate);
  // }, [selectedCandidate]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (selectedCandidate) {
      fetchCandidateDetails(selectedCandidate.candidate_id, signal);
    }
    return () => {
      // Cleanup function to abort the request when the component unmounts
      return controller.abort();
    };
  }, [selectedCandidate]);

  const openCandidateDetails = (candidateId) => {
    setSelectedCandidate({ candidate_id: candidateId });
  };

  return (
    <>
      <Notification
        open={showNotification}
        handleClose={() => setShowNotification(false)}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />

      <div style={{ marginTop: "-15px" }}>
        <div className="admin-list">
          <div>
            {loading && (
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            )}
            <div className="col-md-2 flex-container">
              <label className="labelCount">Total Applications Received:</label>
              <input
                className="form-control totalCount"
                disabled
                value={count?.TotalApplicationCount || ""}
              />
            </div>
            <p className="SCA-heading" style={{ marginTop: "7%" }}>
              Reports
            </p>
            <div className="row">
              <div className="col-md-4 ">
                <label>Select Category:</label>
                <select
                  name="category_name"
                  id="categoryDropdown"
                  value={selectedCategory}
                  className="form-control"
                  onChange={(e) =>
                    handleCategory("category_name", e.target.value)
                  }
                >
                  <option value="">All</option>
                  {jobCategories.map((category, index) => (
                    <option key={index} value={category.category_name}>
                      {category.category_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-1" style={{ width: "0px" }}>
                <input
                  className="form-control CategoryCount"
                  disabled
                  value={count?.CategoryCount || ""}
                />
              </div>

              <div className="col-md-4 pl-0">
                <label>Select Post:</label>
                <select
                  id="dropdown"
                  name="post_name"
                  className="form-control"
                  onClick={() => {
                    if (selectedCategory === "") {
                      setNotificationMessage("Please select a category first");
                      setNotificationSeverity("error");
                      setShowNotification(true);
                    }
                  }}
                  onChange={(e) => handlePost("post_name", e.target.value)}
                >
                  <option value="">All</option>
                  {post.map((post, index) => (
                    <option key={index} value={post}>
                      {post}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* </div> */}

            <div className="table-responsive">
              <table className="table table-responsive">
                <thead
                  style={{ color: "rgba(0, 0, 0, 0.63)" }}
                  className="thead"
                >
                  <tr>
                    <th>S No.</th>
                    <th>First Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Post Name</th>
                    <th>Category Name</th>
                    <th>Specialization</th>
                    <th>View Details</th>
                    <th>Resume</th>
                  </tr>
                </thead>
                <tbody>
                  {ReportsData.map((candidate, index) => (
                    <tr key={index}>
                      <td>
                        <b>{(currentPage - 1) * itemsPerPage + index + 1}</b>
                      </td>
                      <td>{candidate.candidate.first_name || "-"}</td>
                      <td>{candidate.candidate.email || "-"}</td>
                      <td>{candidate.candidate.contact_1 || "-"}</td>
                      <td>{candidate.applied_post_master?.post_name || "-"}</td>
                      <td>
                        {candidate.job_category_master?.category_name || "-"}
                      </td>
                      <td>{candidate.candidate.specialization || "-"}</td>
                      {/* <td onClick={() => fetchCandidateDetails(candidate.candidate_id)} style={{ cursor: 'pointer' }}><img src={updatebtn} className="up-del-btn" alt=""/></td> */}
                      <td
                        onClick={() =>
                          openCandidateDetails(candidate.candidate_id)
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <img src={updatebtn} className="up-del-btn" alt="" />
                      </td>

                      <td
                        variant="primary"
                        onClick={() =>
                          handleResumeClick(candidate.candidate_id)
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <img src={viewbtn} className="up-del-btn" alt="" />
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

            {/* <Dialog open={selectedCandidate !== null} onClose={() => setSelectedCandidate(null)}> */}
            <Dialog open={!!selectedCandidate}>
              {loadingPopup && (
                <div className="loaderPopupContainer">
                  <p className="wait">Please wait</p>
                  <div className="loaderPopup"></div>
                </div>
              )}
              <DialogTitle>Personal Information</DialogTitle>
              <DialogContent>
                {selectedCandidate && (
                  <div>
                    <p>
                      <strong>First Name:</strong>{" "}
                      {selectedCandidate.first_name}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedCandidate.email}
                    </p>
                    <p>
                      <strong>Contact:</strong> {selectedCandidate.contact_1}
                    </p>
                    <p>
                      <strong>City:</strong> {selectedCandidate.city}
                    </p>

                    <div className="lower-box">
                      <div className="education-section">
                        <h5 className="section-heading">Education</h5>
                        {selectedCandidate.candidate_educations &&
                          selectedCandidate.candidate_educations.map(
                            (education, index) => (
                              <p key={index}>
                                <strong></strong>{" "}
                                {education.exam_types_master.exam_name ||
                                  "NULL"}
                                -({education.degree_types_name || "NULL"}){" "}
                              </p>
                            )
                          )}
                      </div>
                      <div className="experience-section">
                        <h5 className="section-heading">Experience</h5>
                        {selectedCandidate.candidate_experiences &&
                          selectedCandidate.candidate_experiences.map(
                            (experience, index) => (
                              <div key={index}>
                                <p>
                                  <strong>Company name:</strong>{" "}
                                  {experience.company_experience_name || "NULL"}
                                </p>
                                <p>
                                  <strong>Designation:</strong>{" "}
                                  {experience.designation || "NULL"}
                                </p>
                                <p>
                                  <strong>From:</strong> (
                                  {formatDateForInput(
                                    experience.exp_work_from
                                  ) || "NULL"}
                                  )
                                </p>
                                <p>
                                  <strong>To:</strong> (
                                  {formatDateForInput(experience.exp_work_to) ||
                                    "NULL"}
                                  )
                                </p>
                              </div>
                            )
                          )}
                      </div>
                    </div>
                  </div>
                )}
              </DialogContent>

              <DialogActions>
                <Button
                  onClick={() => setSelectedCandidate(null)}
                  style={{ position: "sticky" }}
                  color="primary"
                  id="set-btn"
                  className="closebutton"
                >
                  Close
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={showPdfDialog}
              onClose={handleClosePdfDialog}
              maxWidth="md"
            >
              <DialogTitle>Resume</DialogTitle>
              <DialogContent>
                <embed
                  src={pdfUrl}
                  type="application/pdf"
                  width="400px"
                  height="500px"
                />
              </DialogContent>
              <DialogActions>
                <button id="set-btn" onClick={handleClosePdfDialog}>
                  Close
                </button>
              </DialogActions>
            </Dialog>

            {/* <Pagination>
          <Pagination.Prev onClick={prevPage} />
          <Pagination.Item>{currentPage}</Pagination.Item>
          <Pagination.Next onClick={nextPage} />
        </Pagination> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Reports;
