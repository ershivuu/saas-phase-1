import React, { useState, useEffect } from "react";
import updatebtn from "../../../assets/logos/update.png";

import adminApiService from "../../adminApiService";
import Notification from "../../../Notification/Notification";
import { Dialog, DialogContent, DialogActions } from "@mui/material";
function AddDegree() {
  const [data, setData] = useState([]);
  const [examTypes, setExamTypes] = useState([]);
  const [selectedExamType, setSelectedExamType] = useState("");
  const [newDegree, setNewDegree] = useState("");
  const [selectedExamId, setSelectedExamId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");
  const [notificationOpen, setNotificationOpen] = useState(false);
  // ------------------GET DATA FROM API--------------------------------

  const fetchexamType = async () => {
    try {
      const response = await adminApiService.getExam();
      setExamTypes(response.data);
    } catch (error) {
      console.error("Error fetching exam types:", error);
    }
  };

  const degreeTypeMaster = async () => {
    try {
      const response = await adminApiService.getDegreeTypeMaster();
      setData(response.data);
    } catch (error) {
      console.error("Error fetching degree type master data:", error);
    }
  };

  useEffect(() => {
    degreeTypeMaster();
    fetchexamType();
  }, []);

  const fetchUpdateData = async (id) => {
    try {
      const response = await adminApiService.getDegreeById(id);
      // console.log("check pput api response",response)
      setUpdateData(response);
      setSelectedExamType(response.exam_types_master.exam_name);
    } catch (error) {
      console.error("Error fetching degree data:", error);
    }
  };

  const handleAddDegree = async () => {
    try {
      const response = await adminApiService.addDegreeType(
        selectedExamId,
        newDegree
      );
      setNotificationMessage("Added Successfully.");
      setNotificationSeverity("success");
      setNotificationOpen(true);
      setData([...data, response]);
      setIsModalOpen(false);
      degreeTypeMaster();
    } catch (error) {
      console.error(error);
      setNotificationMessage("error during added Degree");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleUpdateDegree = async () => {
    console.log("");
    try {
      const payload = {
        exam_types_master_id: selectedExamId,
        degree_name: updateData.degree_name,
        degreetypes_id: updateData.id,
      };
      await adminApiService.updateDegree(payload);
      setNotificationMessage("Updated Successfully.");
      setNotificationSeverity("success");
      setNotificationOpen(true);
      setUpdateModalOpen(false);
      degreeTypeMaster();
    } catch (error) {
      console.error(error);
    }
  };

  // ------------------------when allow to delete----------------

  // const handleDelete = (id) => {
  //   let accessToken = sessionStorage.getItem("Token");
  //   accessToken = JSON.parse(accessToken);
  //   axios
  //     .delete(`${ADMIN_BASE_URL}/degreeTypeMaster/${id}`, {
  //       headers: {
  //         "access-token": accessToken.token,
  //       },
  //     })
  //     .then((response) => {
  //       console.log("degree deleted successfully!");
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting Subject:", error);
  //     });
  // };
  // ----------------------------------------------------
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleOpenUpdateModal = (id) => {
    console.log("check data", id);
    fetchUpdateData(id);
    const selectedExam = examTypes.find(
      (exam) => exam.id === updateData?.exam_types_master_id
    );
    console.log(selectedExam, "<<<");
    if (selectedExam) {
      setSelectedExamType(selectedExam.exam_name);
      setSelectedExamId(selectedExam.id);
    }
    setUpdateModalOpen(true);
  };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  //   setUpdateModalOpen(false);
  // };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "700",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Notification
        open={notificationOpen}
        handleClose={() => setNotificationOpen(false)}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
      <div className="container-1">
        <div className="new-opening-btn">
          <button onClick={handleOpenModal}>Add Degree</button>
        </div>

        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          PaperProps={{ style: { width: "100%" } }}
        >
          <DialogContent>
            <form action="">
              <div>
                <label className="AC-SetLabel-Name">Select Exam Type</label>
                <select
                  name="examType"
                  className="select-jc "
                  value={selectedExamType}
                  onChange={(e) => {
                    const selectedId =
                      examTypes.find(
                        (exam) => exam.exam_name === e.target.value
                      )?.id || "";
                    setSelectedExamId(selectedId);
                    setSelectedExamType(e.target.value);
                  }}
                >
                  <option value="">Select Exam Type</option>
                  {[
                    ...new Set(examTypes.map((examType) => examType.exam_name)),
                  ].map((uniqueExamName, index) => (
                    <option key={index} value={uniqueExamName}>
                      {uniqueExamName}
                    </option>
                  ))}
                </select>
              </div>

              <label
                style={{ marginTop: "20px" }}
                className="AC-SetLabel-Name"
                htmlFor=""
              >
                Add Degree
              </label>
              <input
                className="Ac-set-input"
                type="text"
                placeholder="Add Required Degree"
                value={newDegree}
                onChange={(e) => setNewDegree(e.target.value)}
              />
              <DialogActions>
                <button
                  className="submitbtn"
                  type="button"
                  onClick={handleAddDegree}
                >
                  ADD NOW
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="canclebtn"
                >
                  Cancle
                </button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="admin-list">
        <div className="master-table ">
          <p className="SCA-heading">CURRENT DEGREES AVAILABLE</p>
          <div className="table-responsive fixe-table">
            <table className="table table-responsive">
              <thead style={{ color: "rgba(0, 0, 0, 0.63)" }} className="thead">
                <tr>
                  <th scope="col">Sr. No.</th>
                  <th scope="col">Exam Name</th>
                  <th scope="col">Degree Name</th>
                  <th scope="col">UPDATE</th>
                  {/* <th scope="col">DELETE</th> */}
                </tr>
              </thead>
              <tbody>
                {data.map((category, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{category.exam_types_master?.exam_name}</td>
                    <td>{category.degree_name}</td>
                    <td>
                      <button
                        onClick={() => handleOpenUpdateModal(category.id)}
                        id="table-btns"
                      >
                        <img src={updatebtn} className="up-del-btn" alt="" />
                      </button>
                    </td>
                    {/* <td>
                    <button
                      id="table-btns"
                      onClick={() => handleDelete(category.id)}
                    >
                      <img src={deletebtn} className="up-del-btn" alt="" />
                    </button>
                  </td> */}
                  </tr>
                ))}

                <Dialog
                  open={updateModalOpen}
                  onClose={() => setUpdateModalOpen(false)}
                  PaperProps={{ style: { width: "100%" } }}
                >
                  <DialogContent>
                  <form action="">
                          <div>
                      
                            <label className="AC-SetLabel-Name">
                              Update Exam Type
                            </label>
                            <select
                              name="examType"
                              className="select-jc"
                              value={selectedExamType}
                              onChange={(e) => {
                                // console.log("Selected Exam Type:", e.target.value);
                                const selectedId =
                                  examTypes.find(
                                    (exam) => exam.exam_name === e.target.value
                                  )?.id || "";
                                setSelectedExamId(selectedId);
                                setSelectedExamType(e.target.value);
                              }}
                            >
                              <option value="">Update Exam Type</option>
                              {[
                                ...new Set(
                                  examTypes.map(
                                    (examType) => examType.exam_name
                                  )
                                ),
                              ].map((uniqueExamName, index) => (
                                <option key={index} value={uniqueExamName}>
                                  {uniqueExamName}
                                </option>
                              ))}
                            </select>
                          </div>

                          <label
                            style={{ marginTop: "20px" }}
                            className="AC-SetLabel-Name"
                            htmlFor=""
                          >
                            Update Degree
                          </label>
                          <input
                            className="Ac-set-input"
                            type="text"
                            placeholder="Update Required Degree"
                            name="degree_name"
                            value={updateData?.degree_name || ""}
                            onChange={(e) => {
                              // console.log("Updated Degree Name:", e.target.value);
                              setUpdateData({
                                ...updateData,
                                degree_name: e.target.value,
                              });
                            }}
                          />
                            <DialogActions>
                      <button
                        className="submitbtn"
                        type="button"
                        onClick={handleUpdateDegree}
                        >
                          UPDATE NOW
                      </button>
                      <button
                     onClick={() => setUpdateModalOpen(false)}
                        className="canclebtn"
                      >
                        Cancle
                      </button>
                    </DialogActions>
                        </form>
               
                  </DialogContent>
                </Dialog>
              
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddDegree;
