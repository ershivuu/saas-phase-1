import React, { useState, useEffect } from "react";
import "./Master.css";
import updatebtn from "../../../assets/logos/update.png";
import deletebtn from "../../../assets/logos/delete.png";
// import axios from "axios";
// import { BASE_URL } from "../../../config/config";
// import { ADMIN_BASE_URL } from "../../../config/config";

import adminApiService from "../../adminApiService";
import Notification from "../../../Notification/Notification";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
function AddSubjects() {
  const [subject, setSubject] = useState([]);
  const [newSubject, setNewSubjectName] = useState("");
  // const [editingSubjectId, setEditingSubjectId] = useState(null);
  const [newSubjectType, setNewSubjectType] = useState("");
  const [newSubjectDescription, setNewSubjectDescription] = useState("");
  const [editingSubject, setEditingSubject] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  // const [categories] = useState([]);
  const [setSelectedCategoryId] = useState("");
  const [setSelectedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // const fetchData = () => {
  //   axios
  //     .get(`${ADMIN_BASE_URL}/subjectMaster`)
  //     .then((response) => {
  //       setSubject(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // };

  const fetchData = () => {
    adminApiService
      .fetchSubjects()
      .then((data) => {
        setSubject(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAdd = () => {
    adminApiService
      .addSubject(newSubject, newSubjectType, newSubjectDescription)
      .then((response) => {
        setNotificationMessage("Added Successfully.");
        setNotificationSeverity("success");
        setNotificationOpen(true);
        setSubject([...subject, response]);
        setNewSubjectName("");
        setOpen(false);
        fetchData();
      })
      .catch((error) => {
        console.error(error);
        setNotificationMessage("error during Update subject");
        setNotificationSeverity("error");
        setNotificationOpen(true);
      });
  };

  const handleUpdate = (subject) => {
    setEditingSubject(subject);
    setNewSubjectName(subject.subject_name);
    setNewSubjectType(subject.subject_type);
    setNewSubjectDescription(subject.description);
    setUpdateModalOpen(true);
  };

  const handleSubmitUpdate = () => {
    adminApiService
      .updateSubject(
        newSubject,
        editingSubject,
        newSubjectType,
        newSubjectDescription
      )
      .then((response) => {
        setNotificationMessage("Updated Successfully.");
        setNotificationSeverity("success");
        setNotificationOpen(true);
        const updatedSubjects = subject.map((subj) =>
          subj.id === editingSubject.id ? response : subj
        );
        setSubject(updatedSubjects);
        setEditingSubject(null);
        setNewSubjectName("");
        setNewSubjectType("");
        setNewSubjectDescription("");
        setUpdateModalOpen(false);
        fetchData();
      })
      .catch((error) => {
        console.error(error);
        setNotificationMessage("error during Update subject");
        setNotificationSeverity("error");
        setNotificationOpen(true);
      });
  };

  // const handleDelete = (id) => {
  //   const isConfirmed = window.confirm("Are you sure you want to delete this subject?");
  //   if (isConfirmed) {
  //    adminApiService.deleteSubject(id)
  //       .then(() => {
  //         setSubject(subject.filter((subj) => subj.id !== id));
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // };

  const handleDelete = async (subjectId) => {
    setSubjectToDelete(subjectId);
    setDeleteDialogOpen(true);
  };
  const confirmDelete = async () => {
    try {
      await adminApiService.deleteSubject(subjectToDelete);
      setSubject((prevData) =>
        prevData.filter((subject) => subject.id !== subjectToDelete)
      );
      setNotificationMessage("Deleted Successfully.");
      setNotificationSeverity("success");
      setNotificationOpen(true);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting Department:", error);
      setNotificationMessage("Failed to delete Department. Please try again");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  // const handleSelectPostForUpdate = (categoryId) => {
  //   setSelectedCategoryId(categoryId);
  //   const category = categories.find((cat) => cat.id === categoryId);
  //   setSelectedCategory(category);
  //   setUpdateModalOpen(true);
  // };

  // const handleSelectCategory = (event) => {
  //   setSelectedCategoryId(event.target.value);
  //   const category = categories.find((cat) => cat.id === event.target.value);
  //   setSelectedCategory(category);
  // };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedCategoryId("");
    setSelectedCategory(null);
    setNewCategory("");
  
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleCloseModal = () => {
    setOpen(false);
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
          <button onClick={() => setOpen(true)}>Add Subject</button>
        </div>

        <Dialog
          open={open}
          onClose={handleCloseModal}
          PaperProps={{ style: { width: "100%" } }}
        >
          <DialogContent>
            <form>
              <label
                style={{ marginTop: "20px" }}
                className="AC-SetLabel-Name"
                htmlFor="SubjectName"
              >
                Add Subject Name
              </label>
              <input
                type="text"
                id="SubjectName"
                className="Ac-set-input"
                placeholder="Add Your Subject Name"
                value={newSubject}
                onChange={(e) => setNewSubjectName(e.target.value)}
              />
              <label className="AC-SetLabel-Name" htmlFor="SubjectType">
                Add Subject Type
              </label>
              <input
                type="text"
                id="SubjectType"
                className="Ac-set-input"
                placeholder="Add Subject Type"
                value={newSubjectType}
                onChange={(e) => setNewSubjectType(e.target.value)}
              />
              <label className="AC-SetLabel-Name" htmlFor="SubjectDescription">
                Add Subject Description
              </label>
              <input
                type="text"
                className="Ac-set-input"
                id="SubjectDescription"
                placeholder="Add Description"
                value={newSubjectDescription}
                onChange={(e) => setNewSubjectDescription(e.target.value)}
              />
              <DialogActions>
                <button className="submitbtn" type="button" onClick={handleAdd}>
                  ADD NOW
                </button>
                <button onClick={handleCloseModal} className="canclebtn">
                  Cancle
                </button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="admin-list">
        <div className="master-table ">
          <p className="SCA-heading">CURRENT SUBJECTS AVAILABLE</p>
          <div className="table-responsive fixe-table">
            <table className="table table-responsive">
              <thead style={{ color: "rgba(0, 0, 0, 0.63)" }} className="thead">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">SUBJECT NAME</th>
                  <th scope="col">SUBJECT TYPE</th>
                  <th scope="col">UPDATE</th>
                  <th scope="col">DELETE</th>
                </tr>
              </thead>
              <tbody>
                {subject.map((subject, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{subject.subject_name}</td>
                    <td>{subject.subject_type}</td>
                    <td>
                      <button
                        id="table-btns"
                        onClick={() => handleUpdate(subject)}
                      >
                        <img src={updatebtn} className="up-del-btn" alt="" />
                      </button>
                    </td>
                    <td>
                      <button
                        id="table-btns"
                        onClick={() => handleDelete(subject.id)}
                      >
                        <img src={deletebtn} className="up-del-btn" alt="" />
                      </button>
                    </td>
                  </tr>
                ))}

                <Dialog
                  open={updateModalOpen}
                  onClose={handleCloseUpdateModal}
                  PaperProps={{ style: { width: "100%" } }}
                >
                  <DialogContent>
                    <form>
                      <label className="AC-SetLabel-Name" htmlFor="SubjectName">
                        Add Subject Name
                      </label>
                      <input
                        type="text"
                        id="SubjectName"
                        className="Ac-set-input"
                        placeholder="Add Your Subject Name"
                        value={newSubject}
                        onChange={(e) => setNewSubjectName(e.target.value)}
                      />
                      <label className="AC-SetLabel-Name" htmlFor="SubjectType">
                        Add Subject Type
                      </label>
                      <input
                        type="text"
                        id="SubjectType"
                        className="Ac-set-input"
                        placeholder="Add Subject Type"
                        value={newSubjectType}
                        onChange={(e) => setNewSubjectType(e.target.value)}
                      />
                      <label
                        className="AC-SetLabel-Name"
                        htmlFor="SubjectDescription"
                      >
                        Add Subject Description
                      </label>
                      <input
                        type="text"
                        className="Ac-set-input"
                        id="SubjectDescription"
                        placeholder="Add Description"
                        value={newSubjectDescription}
                        onChange={(e) =>
                          setNewSubjectDescription(e.target.value)
                        }
                      />
                    </form>
                    <DialogActions>
                      <button
                        className="submitbtn"
                        type="button"
                        onClick={handleSubmitUpdate}
                      >
                        UPDATE NOW
                      </button>
                      <button
                        onClick={handleCloseUpdateModal}
                        className="canclebtn"
                        type="button"
                      >
                        Cancle
                      </button>
                    </DialogActions>
                  </DialogContent>
                </Dialog>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Catgeory</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this Department?
        </DialogContent>
        <DialogActions>
          <button className="submitbtn" onClick={confirmDelete} >
            Delete
          </button>
          <button
            onClick={handleCloseDeleteDialog}
           className="canclebtn"
          >
            Cancel
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddSubjects;
