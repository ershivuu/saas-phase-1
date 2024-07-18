import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddForm.css";
import adminApiService from "../../../../adminApiService";

import MasterJobTable from "../MasterJobProfileChild/MasterJobTable.jsx"
import Notification from "../../../../../Notification/Notification";
import {  DialogActions } from "@mui/material";
function AddForm() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [departmant, setDepartmant] = useState([]);
  const [jobCategories, setJobCategories] = useState([]);
  const [post, setPost] = useState([]);
  const [selectedPost, setSelectedPost] = useState("");
  const [subPost, setSubPost] = useState("");
  const [selectedSubPost, setSelectedSubPost] = useState("");
  const [addToCurrentOpening, setAddToCurrentOpening] = useState(false);
  const [addToInterviewSchedule, setAddToInterviewSchedule] = useState(false);
  const [publishToJobProfile, setPublishToJobProfile] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  const [formValues, setFormValues] = useState({
    job_category_master_id: 0,
    department_master_id: 0,
    applied_subpost_master_id: 0,
    applied_post_masters_id: 0,
    education_require: "",
    qualification_require: "",
    last_date_to_apply: "",
    publish_to_vacancy: false,
    publish_to_schedule_interview: false,
    publish_to_job_profile: false,
    schedule_interview_date_1: null,
    schedule_interview_date_2: null,
    schedule_interview_date_3: null,
    number_of_vacancy: 0,
    eligibility_criteria: "",
    // is_active: true,
    salary_grade: "",
    responsible_contact: "",
  });

  useEffect(() => {
    const fetchJobCategories = async () => {
      try {
        const response = await adminApiService.getJobCategories();
        setJobCategories(response.data);
      } catch (error) {
        console.error("Error fetching job categories:", error);
      }
    };

    fetchJobCategories();
  }, []);
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await adminApiService.getDepartments();
        setDepartmant(response.data);
        // console.log("department", response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  // const handleclick = () => {
  //   navigate("/adminpanel");
  // };

  const handleCategory = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    const selectedCategoryData = jobCategories.find(
      (category) => category.category_name === selectedCategory
    );
    setFormValues({
      ...formValues,
      job_category_master_id: selectedCategoryData
        ? selectedCategoryData.id
        : "",
    });
    setPost(
      selectedCategoryData ? selectedCategoryData.applied_post_masters : []
    );
    setSelectedPost("");
    setSubPost([]);
  };

  const handlePost = (event) => {
    const selectedPost = event.target.value;
    setSelectedPost(selectedPost);
    const selectedPostData = post.find(
      (post) => post.post_name === selectedPost
    );
    setFormValues({
      ...formValues,
      applied_post_masters_id: selectedPostData ? selectedPostData.id : "",
    });
    setSubPost(
      selectedPostData ? selectedPostData.applied_subpost_masters : []
    );
  };

  const handleSubPost = (event) => {
    const selectedSubPostName = event.target.value;
    setSelectedSubPost(selectedSubPostName);
    const selectedSubPostData = subPost.find(
      (subpost) => subpost.subpost_name === selectedSubPostName
    );
    // Additional logic with selectedSubPostData if needed
    setFormValues({
      ...formValues,
      applied_subpost_master_id: selectedSubPostData
        ? selectedSubPostData.id
        : "",
    });
  };

  const handleDepartmant = (event) => {
    const selectedDepartment = event.target.value;
    setSelectedDepartment(selectedDepartment);
    const selectedDepartmentData = departmant.find(
      (department) => department.dept_name === selectedDepartment
    );
    setFormValues({
      ...formValues,
      department_master_id: selectedDepartmentData
        ? selectedDepartmentData.id
        : "",
    });
  };

  const handleCheckboxChange = (checkboxName) => {
    switch (checkboxName) {
      case "addToCurrentOpening":
        setAddToCurrentOpening((prev) => !prev);
        setFormValues((prevValues) => ({
          ...prevValues,
          publish_to_vacancy: !prevValues.publish_to_vacancy,
        }));
        break;
      case "addToInterviewSchedule":
        setAddToInterviewSchedule((prev) => !prev);
        setFormValues((prevValues) => ({
          ...prevValues,
          publish_to_schedule_interview:
            !prevValues.publish_to_schedule_interview,
        }));
        break;
      case "publishToJobProfile":
        setPublishToJobProfile((prev) => !prev);
        setFormValues((prevValues) => ({
          ...prevValues,
          publish_to_job_profile: !prevValues.publish_to_job_profile,
        }));
        break;
      default:
        break;
    }
  };

  // const handleSetAllCheckboxes = (value) => {
  //   setAddToCurrentOpening(value);
  //   setAddToInterviewSchedule(value);
  //   setPublishToJobProfile(value);

  //   setFormValues({
  //     ...formValues,
  //     publish_to_vacancy: value,
  //     publish_to_schedule_interview: value,
  //     publish_to_job_profile: value,
  //   });
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await adminApiService.postJobProfile(formValues);
      // console.log("Job profile submitted successfully!", response.data);
      setNotificationMessage("Job profile submitted successfully!");
      setNotificationSeverity("success");
      setShowNotification(true);
      navigate("/admin-dashboard/current-openings");
    } catch (error) {
      console.error("Error submitting job profile:", error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Error response data:", error.response.data);
        const errorMessage =
          error.response.data.message || "Error submitting job profile.";
        setNotificationMessage(errorMessage);
        setNotificationSeverity("error");
      } else if (error.request) {
        // The request was made but no response was received
        // console.log("No response received from server");
        setNotificationMessage(
          "No response received from server. Please try again later."
        );
        setNotificationSeverity("error");
      } else {
        // Something else happened in making the request that triggered an error
        console.log("Error:", error.message);
        setNotificationMessage(
          "Error submitting job profile. Please try again later."
        );
        setNotificationSeverity("error");
      }

      setShowNotification(true);
    }
  };

  const showForm = (true); 

  const handleFormCloseAndShowTable = () => {
    navigate("/admin-dashboard/job-profile");
  };

  return (
    <>
      <Notification
        open={showNotification}
        handleClose={() => setShowNotification(false)}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />

      <div>
        {showForm ? (
          <div className="new-openings">
            {/* <img
              onClick={handleFormCloseAndShowTable}
              className="cls-btn"
              src={close}
              alt="Close Button"
            /> */}

            <p className="master-heading">Add New Opening</p>
            <div className="new-openings-form">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* <div className="col-6">
                    <label htmlFor="">No. Of Openings</label>
                    <input
                      type="number"
                      placeholder="Add No. Of Openings"
                      name="number_of_vacancy"
                      value={formValues.number_of_vacancy}
                      onChange={handleInputChange}
                    />
                  </div> */}

                  <div className="col-6">
                    <label htmlFor="dropdown2">Category</label>
                    <select
                      name="category_name"
                      id="categoryDropdown"
                      value={selectedCategory}
                      onChange={handleCategory}
                      required
                    >
                      <option value="">Select a category</option>
                      {jobCategories.map((category,index) => (
                        <option
                          key={index}
                          value={category.category_name}
                        >
                          {category.category_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-6">
                    <label htmlFor="dropdown2">Department</label>
                    <select
                      id="departmentDropdown"
                      value={selectedDepartment}
                      onChange={handleDepartmant}
                    >
                      <option value="">Select Department</option>
                      {departmant.map((department,index) => (
                        <option
                          key={index} // assuming 'id' is unique for each department
                          value={department.dept_name}
                        >
                          {department.dept_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row">
               
                  <div className="col-6">
                    <label htmlFor="">Post</label>
                    <select
                      id="dropdown"
                      onChange={handlePost}
                      value={selectedPost}
                      required
                    >
                      <option value="">Select a post</option>
                      {post.map((post,index) => (
                        <option key={index} value={post.post_name}>
                          {post.post_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-6">
                    <label htmlFor="dropdown2">SubPost</label>
                    <select
                      id="dropdown2"
                      value={selectedSubPost}
                      onChange={handleSubPost}
                    >
                      <option value="">-- Select SubPost --</option>
                      {Array.isArray(subPost) &&
                        subPost.map((subpost,index) => (
                          <option
                            key={index}
                            value={subpost.subpost_name}
                          >
                            {subpost.subpost_name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="row">
               
                  <div className="col-6">
                    <label htmlFor=""> Qualification & Experience</label>
                    <input
                      type="text"
                      placeholder=" Add Qualification And Experience"
                      name="education_require"
                      value={formValues.education_require}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor=""> Highly Desirable</label>
                    <input
                      type="text"
                      placeholder="Add Highly Desirable"
                      name="qualification_require"
                      value={formValues.qualification_require}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

           
          
                <div>
                  {/* <button type="submit" id="add-job" onClick={handleSubmit}>
                    SUBMIT
                  </button> */}
                   <DialogActions>
                  <button onClick={handleSubmit} className="submitbtn"  type="submit">
                  SUBMIT
                        </button>
                        <button    onClick={handleFormCloseAndShowTable} className="canclebtn" >
                            Cancle
                        </button>
                        </DialogActions>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <MasterJobTable />
        )}
      </div>
    </>
  );
}

export default AddForm;
