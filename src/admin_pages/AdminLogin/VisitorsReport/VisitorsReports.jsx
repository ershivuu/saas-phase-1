import React, { useState, useEffect } from "react";
import adminApiService from "../../adminApiService";
import updatebtn from "../../../assets/logos/update.png";
import deletebtn from "../../../assets/logos/delete.png";
import close from "../../../assets/logos/close.png";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "./Visitor.css";
import Notification from "../../../Notification/Notification";
import "./Visitor.css";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
function VisitorsReports() {
  const [visitorData, setVisitorData] = useState([]);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [isAttend, setIsAttend] = useState(false);
  const [isClose, setIsClose] = useState(false);
  const [deleteVisiotrId, setDeleteVisitorId] = useState(null);
  const [updateData, setUpdateData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    contact_1: "",
    message: "",
    action_discription: "",
    is_attend: false,
    is_close: false,
    assign_to: false,
  });
  const [updateNewField, setUpdateNewField] = useState({});
  const [allottedError, setAllottedError] = useState("");
  const [commentsError, setCommentsError] = useState("");



  const fetchVisitorData = async () => {
    try {
      const response = await adminApiService.getVisitor();

      setVisitorData(response);
    } catch (error) {
      console.error("Error fetching visitor details:", error);
    }
  };
  useEffect(() => {
    fetchVisitorData();
  }, []);
  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
  };

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
  const handleSelectPostForUpdate = (visitorId) => {
    const selectedVisitor = visitorData.find(
      (visitor) => visitor.id === visitorId
    );
    console.log("selectedVisitor>>>>>", selectedVisitor);
    setSelectedVisitor(selectedVisitor);
    setUpdateData(selectedVisitor);
    setIsAttend(selectedVisitor.is_attend);
    setIsClose(selectedVisitor.is_close);
    setUpdateModalOpen(true);
  };
  const handleCheckboxChange = (fieldName, value) => {
    let updatedValue = !value;
    setUpdateData((prevValues) => ({
      ...prevValues,
      [fieldName]: updatedValue,
    }));

    switch (fieldName) {
      case "is_attend":
        setIsAttend(updatedValue);
        // console.log("is_attend:", updatedValue);
        setUpdateNewField((prevValues) => ({
          ...prevValues,
          [fieldName]: updatedValue,
        }));
        break;
      case "is_close":
        setIsClose(updatedValue);
        // console.log("is_close:", updatedValue);
        setUpdateNewField((prevValues) => ({
          ...prevValues,
          [fieldName]: updatedValue,
        }));
        break;
      default:
        break;
    }
  };
  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const handleChange = (fieldName, value) => {
    const MAX_ASSIGN_TO_LENGTH = 40;
    const MAX_ACTION_DESC_LENGTH = 200;

    if (fieldName === "assign_to" && value.length > MAX_ASSIGN_TO_LENGTH) {
      setAllottedError("Maximum 40 characters allowed.");
      return; // Ignore typing if limit exceeded
    } else {
      setAllottedError(""); // Clear the error if within limit
    }

    if (fieldName === "action_discription" && value.length > MAX_ACTION_DESC_LENGTH) {
      setCommentsError("Maximum 200 characters allowed.");
      return; // Ignore typing if limit exceeded
    } else {
      setCommentsError(""); // Clear the error if within limit
    }

    console.log("handlefild", fieldName, value, updateNewField);
    setUpdateNewField((prev) => ({ ...prev, [fieldName]: value.toString() }));
    setUpdateData((prev) => ({ ...prev, [fieldName]: value.toString() }));
  };
  const handleUpdateVisitor = async () => {
    console.log("visitor id", updateData.id);
    const newFormData = {
      ...updateNewField,
      visitor_id: updateData.id,
    };
    try {
      const response = await adminApiService.updateVisitor(newFormData);
      console.log("Updated Visitor:", response);
      setNotificationMessage("Updated Successfully.");
      setNotificationSeverity("success");
      setNotificationOpen(true);
      fetchVisitorData();
      setUpdateModalOpen(false);
    } catch (error) {
      console.error("Error updating visitor:", error);
      setNotificationMessage("Error Update Changes.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };
  const handleDeleteClick = async (visitorId) => {
    setDeleteVisitorId(visitorId);
  };
  const handleConfirmDelete = async () => {
    try {
      const payloadData = {
        visitor_id: deleteVisiotrId,
      };

      await adminApiService.removeVisitor(payloadData);
      setVisitorData(
        visitorData.filter((visitor) => visitor.id !== payloadData)
      );
      fetchVisitorData();
      setNotificationMessage("Deleted Successfully.");
      setNotificationSeverity("success");
      setNotificationOpen(true);
    } catch (error) {
      //   console.error("Error deleting job profile:", error);
      setNotificationMessage("Failed to delete job profile. Please try again!");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    } finally {
      setDeleteVisitorId(null);
    }
  };
  // Function to truncate message to a specific number of words
  const truncateMessage = (message, wordCount) => {
    const words = message.split(" ");
    if (words.length > wordCount) {
      return words.slice(0, wordCount).join(" ") + "...";
    }
    return message;
  };

  return (
    <>
      <Notification
        open={notificationOpen}
        handleClose={() => setNotificationOpen(false)}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
      <div className="admin-list">
        <div className="master-table">
          <p className="SCA-heading">Visitors Report</p>
          <div className="table-responsive ">
            <table className="table table-responsive">
              <thead style={{ color: "rgba(0, 0, 0, 0.63)" }} className="thead">
                <tr>
                  <th scope="col">S.No.</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Message</th>
                  <th scope="col">Assign-To</th>
                  <th scope="col">Is-Attend</th>
                  <th scope="col">Is-Close</th>
                  <th scope="col">Comments</th>
                  <th scope="col">Visiting Date</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {visitorData.map((visitor, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{visitor.first_name}</td>
                    <td>{visitor.last_name}</td>
                    <td>{visitor.email}</td>
                    <td>{visitor.contact_1}</td>
                    <td>{truncateMessage(visitor.message, 2)}</td>

                    <td>{visitor.assign_to || "-"}</td>
                    <td>{visitor.is_attend ? "Yes" : "No"}</td>
                    <td>{visitor.is_close ? "Yes" : "No"}</td>
                    <td>{truncateMessage(visitor.action_discription || "-", 2)}</td>

                    <td>{new Date(visitor.createdAt).toLocaleString()}</td>



                    <td>
                      <button
                        type="button"
                        id="table-btns"
                        onClick={() => handleSelectPostForUpdate(visitor.id)}
                      >
                        <img className="up-del-btn" src={updatebtn} alt="" />
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        id="table-btns"
                        onClick={() => handleDeleteClick(visitor.id)}
                      >
                        <img className="up-del-btn" src={deletebtn} alt="" />
                      </button>
                    </td>
                  </tr>
                ))}

                <Modal
                  open={updateModalOpen}
                  onClose={handleCloseUpdateModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  className="popup-modal"
                >
                  <Box sx={style}>
                    <form>
                      {/* <img
                        onClick={handleCloseUpdateModal}
                        className="postapplied-close-btn"
                        src={close}
                        alt=""
                      /> */}
                      <div className="row">
                        <div className="col-4">
                          <label
                            className="AC-SetLabel-Name"
                            htmlFor="First Name"
                          >
                            <span className="read-only-feilds">*</span>
                            First Name
                          </label>
                          <input
                            type="text"
                            className="visitor-set-input"
                            id=""
                            name="first_name"
                            placeholder="First Name"
                            value={
                              selectedVisitor ? selectedVisitor.first_name : ""
                            }
                          />
                        </div>
                        <div className="col-4">
                          <label
                            className="AC-SetLabel-Name"
                            htmlFor="Last Name"
                          >
                            <span className="read-only-feilds">*</span>
                            Last Name
                          </label>
                          <input
                            type="text"
                            className="visitor-set-input"
                            id=""
                            name="last_name"
                            placeholder="Last Name"
                            value={
                              selectedVisitor ? selectedVisitor.last_name : ""
                            }
                          />
                        </div>
                        <div className="col-4">
                          <label className="AC-SetLabel-Name" htmlFor="Email">
                            <span className="read-only-feilds">*</span>
                            Email
                          </label>
                          <input
                            type="text"
                            className="visitor-set-input"
                            id=""
                            name="email"
                            placeholder="Email"
                            value={selectedVisitor ? selectedVisitor.email : ""}
                          />
                        </div>
                      </div>

                      <div className="row">
                        
                        <div className="col-4">
                          <label className="AC-SetLabel-Name" htmlFor="Contact">
                            <span className="read-only-feilds">*</span>
                            Contact
                          </label>
                          <input
                            type="text"
                            className="visitor-set-input"
                            id=""
                            name="contact_1"
                            placeholder="Contact"
                            value={
                              selectedVisitor ? selectedVisitor.contact_1 : ""
                            }
                          />
                        </div>
                        <div className="col-4">
                          <label
                            className="AC-SetLabel-Name"
                            htmlFor="createdAt"
                          >
                            <span className="read-only-feilds">*</span>
                            CreatedAt
                          </label>
                          <input
                            type="text"
                            className="visitor-set-input"
                            id=""
                            name="createdAt"
                            placeholder="createdAt"
                            value={formatDateForInput(
                              selectedVisitor ? selectedVisitor.createdAt : ""
                            )}
                          />
                        </div>
                        <div className="col-4">
                          <label
                            className="AC-SetLabel-Name"
                            htmlFor="Allotted"
                          >
                            {/* <span className="read-only-feilds">*</span> */}
                            Allotted
                          </label>
                          <input
                            type="text"
                            className="visitor-set-input"
                            id=""
                            name="assign_to"
                            placeholder="Allotted "
                            value={updateData ? updateData.assign_to : ""}
                            onChange={(e) =>
                              handleChange("assign_to", e.target.value)
                            }
                          />
                          {allottedError && <span className="error-message">{allottedError}</span>}
                        </div>
                      </div>

                      <div className="row">
                      
                       
                      </div>

                      <div className="row">
                        <div className="col-12">
                          <label className="AC-SetLabel-Name" htmlFor="Message">
                            <span className="read-only-feilds">*</span>
                            Message
                          </label>
                          <textarea
                            style={{ width: "100%" }}
                            type="text"
                            className="visitor-set-input"
                            id=""
                            name="message"
                            placeholder="Message"
                            value={
                              selectedVisitor ? selectedVisitor.message : ""
                            }
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <label
                            className="AC-SetLabel-Name"
                            htmlFor="Comments"
                          >
                            Comments
                          </label>
                          <input
                            style={{ width: "100%" }}
                            type="text"
                            className="visitor-set-input"
                            id=""
                            name="action_discription"
                            placeholder="Comments"
                            value={
                              updateData ? updateData.action_discription : ""
                            }
                            onChange={(e) =>
                              handleChange("action_discription", e.target.value)
                            }
                          />
                          {commentsError && <span className="error-message">{commentsError}</span>}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-6">
                          <p className="AC-SetLabel-Name">Is Attend</p>
                          <label className="switch">
                            <input
                              type="checkbox"
                              id="checkbox3"
                              name="is_attend"
                              checked={isAttend}
                              onChange={() =>
                                handleCheckboxChange("is_attend", isAttend)
                              }
                            />
                            <span className="slider round"></span>
                          </label>
                        </div>
                        <div className="col-6">
                          <p className="AC-SetLabel-Name">Is Close</p>
                          <label className="switch">
                            <input
                              type="checkbox"
                              id="checkbox3"
                              name="is_close"
                              checked={isClose}
                              onChange={() =>
                                handleCheckboxChange("is_close", isClose)
                              }
                            />
                            <span className="slider round"></span>
                          </label>
                        </div>
                        {/* <div className="col-4">
                                                    <p>assign_to</p>
                                                    <label className="switch">
                                                        <input
                                                            type="checkbox"
                                                            id="checkbox3"
                                                            name="assign_to"
                                                            checked={assignTo}
                                                            onChange={() =>
                                                                handleCheckboxChange(
                                                                  "assign_to",
                                                                  assignTo
                                                                )
                                                              }
                                                        />
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div> */}
                      </div>
                      <p>
                        Note: <span className="read-only-feilds">*</span>These
                        feilds are read only.
                      </p>
                      <DialogActions>
                      <button
                 className="submitbtn" 
                        type="button"
                        onClick={handleUpdateVisitor}
                      >
                        UPDATE NOW
                      </button> 
                        <button    onClick={handleCloseUpdateModal}className="canclebtn" >
                            Cancle
                        </button>
                        
                        </DialogActions>
                      {/* <button
                        id="set-btn"
                        type="button"
                        onClick={handleUpdateVisitor}
                      >
                        UPDATE NOW
                      </button> 
                       <p>
                        Note: <span className="read-only-feilds">*</span>These
                        feilds are read only.
                      </p> */}
                    </form>
                  </Box>
                </Modal>

                <Dialog
                  open={deleteVisiotrId !== null}
                  onClose={() => setDeleteVisitorId(null)}
                >
                  <DialogTitle>Confirm Delete</DialogTitle>
                  <DialogContent>
                    Are you sure you want to delete this item?
                  </DialogContent>
                  <DialogActions>
                    <button
                      className="submitbtn" 
                      onClick={handleConfirmDelete}

                    >
                      Delete
                    </button>
                    <button onClick={() => setDeleteVisitorId(null)} className="canclebtn">
                      Cancel
                    </button>
                  </DialogActions>
                </Dialog>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default VisitorsReports;
