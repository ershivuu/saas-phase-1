import React, { useState, useEffect } from "react";
import "./AdminRegister.css";

// import medilogo from "../../../../assets/logos/medi-logo.png"
import axios from "axios";

import { ADMIN_BASE_URL } from "../../../../config/config";
function AdminRegister() {
  const [departments, setDepartments] = useState([]);
  // const [selectedDepartment, setSelectedDepartment] = useState("");
  const [formData, setFormData] = useState({
    title_first_name: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "",
    email: "",
    contact_1: "",
    password: "",
    department_master_id: "",
  });
  // const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    getDepartment();
  }, []);
  function getDepartment() {
    try {
      axios
        .get(`${ADMIN_BASE_URL}/departmentMaster`)
        .then((response) => {
          setDepartments(response.data);
        })
        .catch((error) => {
          console.error("Error fetching departments:", error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "department_master_id" ? parseInt(value) : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       `${BASE_URL}/admin/registerAdmin`,
  //       formData
  //     );

  //       setFormData({
  //         title_first_name: "",
  //         first_name: "",
  //         middle_name: "",
  //         last_name: "",
  //         gender: "",
  //         email: "",
  //         contact_1: "",
  //         password: "",
  //         department_master_id: "",
  //       });
  //       alert("Admin registered successfully");

  //   } catch (error) {
  //     console.error("Error submitting data:", error);
  //   }
  // };

  //new
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a request to register the admin
      await axios.post(`${ADMIN_BASE_URL}/admin/registerAdmin`, formData);

      setFormData({
        title_first_name: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        gender: "",
        email: "",
        contact_1: "",
        password: "",
        department_master_id: "",
      });
      alert("Admin registered successfully");
    } catch (error) {
      // Check if the error message is "email or contact already exist"
      if (
        error.response &&
        error.response.data &&
        error.response.data.error === "email or contact already exist"
      ) {
      } else {
        console.error("Error submitting data:", error);
        alert("Email or contact already exists.");
      }
    }
  };

  return (
    <>
      <div className="reg-container-main">
        <div className="form-heading">
          <p>Register New Admin</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="reg-container">
            <div className="row" style={{ marginTop: "45px" }}>
              <div className="col-6">
                <label htmlFor="">Title</label>
                <select
                  id="dropdown"
                  name="title_first_name"
                  value={formData.title_first_name}
                  onChange={handleChange}
                >
                  <option value="">Please select...</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Miss">Miss</option>
                </select>
              </div>
              <div className="col-6">
                <label htmlFor="">First Name</label>
                <input
                  name="first_name"
                  type="text"
                  placeholder="Enter Your Name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label htmlFor="">Middle Name</label>
                <input
                  name="middle_name"
                  type="text"
                  placeholder="Enter Middle Name"
                  value={formData.middle_name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6">
                <label htmlFor="">Last Name</label>
                <input
                  name="last_name"
                  type="text"
                  placeholder="Enter Last Name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label htmlFor="">Gender</label>
                <select
                  id="dropdown"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Please select...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col-6">
                <label htmlFor="">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label htmlFor="">Contact Number</label>
                <input
                  name="contact_1"
                  type="text"
                  placeholder="Enter Contact Number"
                  value={formData.contact_1}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6">
                <label htmlFor="">Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12">
                <label htmlFor="">Select Department</label>
                <select
                  name="department_master_id"
                  value={formData.department_master_id}
                  onChange={handleChange}
                >
                  <option value="">Select Department</option>
                  {departments.map((department, index) => (
                    <option key={index} value={department.id}>
                      {department.dept_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <button type="submit" className="reg-ad-btn submitbtn">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AdminRegister;
/*
if id=1 role= super_admin
Edit admin-side bar
list of admins
*/
