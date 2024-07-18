import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditOpenings.css";
import adminApiService from "../../../../adminApiService";
import { useParams } from "react-router-dom";
import Notification from "../../../../../Notification/Notification";
import close from "../../../../../assets/logos/close.png"

import {  DialogActions } from "@mui/material";
function EditOpenings() {
  const navigate = useNavigate();
  // console.log("Profile ID:", profileId);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [departmant, setDepartmant] = useState([]);
  const [jobCategories, setJobCategories] = useState([]);
  
  const [selectedPost, setSelectedPost] = useState("");
  const [subPost, setSubPost] = useState([]);
  const [selectedSubPost, setSelectedSubPost] = useState("");

  const [currentOpening, setCurrentOpening] = useState(false);
  const [interviewSchedule, setInterviewSchedule] = useState(false);
  const [publishToJobProfile, setPublishToJobProfile] = useState(false);


  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("info");
  

  const [formValues, setFormValues] = useState({});
  const [updateField, setUpdateField] = useState({});
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const { profileId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      // console.log("profileId",profileId)
      try {
        const response = await adminApiService.getJobProfileById(profileId);
        const data = response.data;
        setCurrentOpening(data.publish_to_vacancy);
        setInterviewSchedule(data.publish_to_schedule_interview);
        setPublishToJobProfile(data.publish_to_job_profile);
        setFormValues(data);
        console.log("Fetched data:", data);
        // console.log("CurrentOpening", data.publish_to_vacancy);
        // console.log("InterviewSchedule", data.publish_to_schedule_interview);
        // console.log("JobProfile", data.publish_to_job_profile);
        setSelectedCategory(data.job_category_master.category_name);
        setSelectedDepartment(data.department_master.dept_name);
        setSelectedPost(data.applied_post_master.post_name);
        setSelectedSubPost(data.applied_subpost_master.subpost_name);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching job profile:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [profileId]);

  useEffect(() => {
    const fetchJobCategories = async () => {
      try {
        const response = await adminApiService.getJobCategories();
        setJobCategories(response.data);
        // console.log("response.data", response.data)
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

  const handleCategory = (fieldName, value) => {
    const selectedCategoryData = jobCategories.find(
      (category) => category.category_name === value
    );
    setSelectedCategory(value);
    setUpdateField((prevValues) => ({
      ...prevValues,
      [fieldName]: value.toString(),
      job_category_master_id: selectedCategoryData
        ? selectedCategoryData.id
        : "",
    }));
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
      job_category_master_id: selectedCategoryData
        ? selectedCategoryData.id
        : "",
    }));
    const selectedPostData =
      selectedCategoryData &&
      selectedCategoryData.applied_post_masters.map((post) => post.post_name);
    setPost(selectedPostData || []);
    setSelectedPost("");
    setSubPost([]);
  };

  const handlePost = (fieldName, value) => {
    const selectedPostObject = jobCategories
      .find((category) => category.category_name === selectedCategory)
      .applied_post_masters.find((post) => post.post_name === value);
    const selectedSubPostData =
      selectedPostObject &&
      selectedPostObject.applied_subpost_masters.map(
        (subpost) => subpost.subpost_name
      );
    setSelectedPost(value);
    setUpdateField((prevValues) => ({
      ...prevValues,
      [fieldName]: value.toString(),
      applied_post_masters_id: selectedPostObject ? selectedPostObject.id : "",
    }));
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
      applied_post_masters_id: selectedPostObject ? selectedPostObject.id : "",
    }));
    setSubPost(selectedSubPostData || []);
  };

  const handleSubPost = (fieldName, value) => {
    const selectedSubPostObject = jobCategories
      .find((category) => category.category_name === selectedCategory)
      .applied_post_masters.find((post) => post.post_name === selectedPost)
      .applied_subpost_masters.find(
        (subpost) => subpost.subpost_name === value
      );

    setSelectedSubPost(value);
    setUpdateField((prevValues) => ({
      ...prevValues,
      [fieldName]: value.toString(),
      applied_subpost_master_id: selectedSubPostObject
        ? selectedSubPostObject.id
        : "",
    }));
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
      applied_subpost_master_id: selectedSubPostObject
        ? selectedSubPostObject.id
        : "",
    }));
  };

  const handleDepartmant = (fieldName, value) => {
    const selectedDepartmentData = departmant.find(
      (department) => department.dept_name === value
    );
    setSelectedDepartment(value);
    setUpdateField((prevValues) => ({
      ...prevValues,
      [fieldName]: value.toString(),
      department_master_id: selectedDepartmentData
        ? selectedDepartmentData.id
        : "",
    }));
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
      department_master_id: selectedDepartmentData
        ? selectedDepartmentData.id
        : "",
    }));
  };

  
  const handleCheckboxChange = (fieldName, value) => {
    let updatedValue = !value; // Toggle the value
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName]: updatedValue,
    }));

    switch (fieldName) {
      case "publish_to_vacancy":
        setCurrentOpening(updatedValue);
        // console.log("currentOpening:", updatedValue);
        setUpdateField((prevValues) => ({
          ...prevValues,
          [fieldName]: updatedValue.toString(),
        }));
        break;
      case "publish_to_schedule_interview":
        setInterviewSchedule(updatedValue);
        // console.log("interviewSchedule:", updatedValue);
        setUpdateField((prevValues) => ({
          ...prevValues,
          [fieldName]: updatedValue.toString(),
        }));
        break;
      case "publish_to_job_profile":
        setPublishToJobProfile(updatedValue);
        // console.log("publishToJobProfile:", updatedValue);
        setUpdateField((prevValues) => ({
          ...prevValues,
          [fieldName]: updatedValue.toString(),
        }));
        break;
      default:
        break;
    }
  };

  const handleInputChange = (fieldName, value) => {
    // console.log("handlefild", fieldName, value, updateField);
    setUpdateField((prev) => ({ ...prev, [fieldName]: value.toString() }));
    setFormValues((prev) => ({ ...prev, [fieldName]: value.toString() }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // console.log("put data values", formValues);
    try {
      const profileID = formValues.id;
      const updatedData = {
        ...updateField,
        jobprofile_id: profileID,
      };
      // console.log(updateField);
      // await adminApiService.updateJobProfile(updatedData);

      await adminApiService.updateJobProfile(updatedData);
      setUpdateField({});
      // window.location.reload();
      setNotificationOpen(true);
      setNotificationSeverity("success");
      setNotificationMessage("Form submitted successfully!");
      navigate("/admin-dashboard/current-openings");
    } catch (error) {
      console.error("Error updating job profile:", error);
      setNotificationOpen(true);
    setNotificationSeverity("error");
    setNotificationMessage("Error submitting form. Please try again later.");
    }
  };

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };



  const handleFormCloseAndShowTable = () => {
    navigate('/admin-dashboard/current-openings');
  };

  return (
    <>
      <Notification
  open={notificationOpen}
  handleClose={() => setNotificationOpen(false)}
  alertMessage={notificationMessage}
  alertSeverity={notificationSeverity}
/>
      <div className="new-openings">
        <img
          onClick={handleFormCloseAndShowTable}
          className="cls-btn"
          src={close}
          alt="Close Button"
        />

        {loading && (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        )}
        <p className="master-heading">Edit-Openings Data</p>
        <div className="new-openings-form">
      
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6">
                <label htmlFor="">No. Of Openings</label>
                <input
                  type="number"
                  placeholder="Add No. Of Openings"
                  name="number_of_vacancy"
                  value={formValues.number_of_vacancy}
                  onChange={(e) =>
                    handleInputChange("number_of_vacancy", e.target.value)
                  }
                />
              </div>

              <div className="col-6">
                <label htmlFor="dropdown2">Category</label>
                <select
                  name="category_name"
                  id="categoryDropdown"
                  value={selectedCategory}
                  // onChange={handleCategory}
                  onChange={(e) =>
                    handleCategory("category_name", e.target.value)
                  }
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
            </div>
            <div className="row">
              <div className="col-6">
                <label htmlFor="dropdown2">Department</label>
                <select
                  id="departmentDropdown"
                  name="dept_name"
                  value={selectedDepartment}
                  onChange={(e) =>
                    handleDepartmant("dept_name", e.target.value)
                  }
                >
                  <option value="">Select Department</option>
                  {departmant.map((department,index) => (
                    <option key={index} value={department.dept_name}>
                      {department.dept_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-6">
                <label htmlFor="">Post</label>
                <select
                  id="dropdown"
                  name="post_name"
                  onChange={(e) => handlePost("post_name", e.target.value)}
                  // value={selectedPost}
                >
                  <option value="">{selectedPost} </option>
                  {post.map((post,index) => (
                    <option key={index} value={post}>
                      {post}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label htmlFor="dropdown2">SubPost</label>
                <select
                  id="dropdown2"
                  name="subpost_name"
                  // value={selectedSubPost}
                  // onChange={handleSubPost}
                  onChange={(e) =>
                    handleSubPost("subpost_name", e.target.value)
                  }
                >
                  <option value="">{selectedSubPost}</option>
                  {subPost.map((subpost,index) => (
                    <option key={index} value={subpost}>
                      {subpost}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-6">
                <label htmlFor=""> Qualification & Experience</label>
                <input
                  type="text"
                  placeholder=" Add Qualification And Experience"
                  name="education_require"
                  value={formValues.education_require}
                  onChange={(e) =>
                    handleInputChange("education_require", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <label htmlFor=""> Highly Desirable</label>
                <input
                  type="text"
                  placeholder="Add Highly Desirable"
                  name="qualification_require"
                  value={formValues.qualification_require}
                  onChange={(e) =>
                    handleInputChange("qualification_require", e.target.value)
                  }
                />
              </div>
              <div className="col-6">
                <label htmlFor="">Last Date</label>
                <input
                  type="date"
                  name="last_date_to_apply"
                  value={formatDateForInput(formValues.last_date_to_apply)}
                  onChange={(e) =>
                    handleInputChange("last_date_to_apply", e.target.value)
                  }
                />
              </div>
            </div>
            <div>
              <p id="master-sub-headings">
                Required Fields For Interview Schedule
              </p>
            </div>
            <div className="row">
              <div className="col-6">
                <label htmlFor="">Eligibility criteria</label>
                <input
                  type="text"
                  placeholder="Add Eligibility Criteria"
                  name="eligibility_criteria"
                  value={formValues.eligibility_criteria}
                  onChange={(e) =>
                    handleInputChange("eligibility_criteria", e.target.value)
                  }
                />
              </div>
              <div className="col-6">
                <label htmlFor="">Add Responsible Person's Contact </label>
                <input
                  type="text"
                  placeholder="Add Contact"
                  name="responsible_contact"
                  value={formValues.responsible_contact}
                  onChange={(e) =>
                    handleInputChange("responsible_contact", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <label htmlFor="">Day-1</label>
                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  name="schedule_interview_date_1"
                  value={formValues.schedule_interview_date_1 ? formatDateForInput(formValues.schedule_interview_date_1) : ""}
                  onChange={(e) =>
                    handleInputChange(
                      "schedule_interview_date_1",
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="col-4">
                <label htmlFor="">Day-2</label>
                <input
                  type="date"
                  name="schedule_interview_date_2"
                  placeholder="dd/mm/yyyy"
                  value={formValues.schedule_interview_date_2 ? formatDateForInput(formValues.schedule_interview_date_2) : ""}
                    onChange={(e) =>
                    handleInputChange(
                      "schedule_interview_date_2",
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="col-4">
                <label htmlFor="">Day-3</label>
                <input
                  type="date"
                  name="schedule_interview_date_3"
                  placeholder="dd/mm/yyyy"
                  value={formValues.schedule_interview_date_3 ? formatDateForInput(formValues.schedule_interview_date_3) : ""}
                  onChange={(e) =>
                    handleInputChange(
                      "schedule_interview_date_3",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
            <div className="row toggle-btns">
              <div className="col-4">
                <p>Add To Current Opening</p>
                <label className="switch">
                  <input
                    type="checkbox"
                    id="checkbox1"
                    name="publish_to_vacancy"
                    checked={currentOpening}
                    onChange={() =>
                      handleCheckboxChange("publish_to_vacancy", currentOpening)
                    }
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="col-4">
                <p>Add To Interview Schedule</p>
                <label className="switch">
                  <input
                    type="checkbox"
                    id="checkbox2"
                    name="publish_to_schedule_interview"
                    checked={interviewSchedule}
                    onChange={() =>
                      handleCheckboxChange(
                        "publish_to_schedule_interview",
                        interviewSchedule
                      )
                    }
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="col-4">
                <p>Publish To Job Profile</p>
                <label className="switch">
                  <input
                    type="checkbox"
                    id="checkbox3"
                    name="publish_to_job_profile"
                    checked={publishToJobProfile}
                    onChange={() =>
                      handleCheckboxChange(
                        "publish_to_job_profile",
                        publishToJobProfile
                      )
                    }
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>

            <div>
              {/* <button type="submit"  id="add-job">
                SUBMIT
              </button> */}
               <DialogActions>
                  <button  className="submitbtn"  type="submit">
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
    </>
  );
}

export default EditOpenings;
