import React, { useEffect, useState } from "react";
// import { ADMIN_BASE_URL } from "../../../config/config";
import updatebtn from "../../../assets/logos/update.png";
import deletebtn from "../../../assets/logos/delete.png";

import adminApiService from "../../adminApiService";
import Notification from "../../../Notification/Notification";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
function AddDepartment() {
  const [departments, setDepartments] = useState([]);
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [editingDepartmentId, setEditingDepartmentId] = useState(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await adminApiService.getDepartments();
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await adminApiService.addDepartment(newDepartmentName);
      setNotificationMessage("Added Successfully.");
      setNotificationSeverity("success");
      setNotificationOpen(true);
      setDepartments([...departments, response]);

      setNewDepartmentName("");
      setOpen(false);
    } catch (error) {
      console.error(error);
      setNotificationMessage("error during added Department");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  // const handleDelete = async (id) => {
  //   const isConfirmed = window.confirm(
  //     "Are you sure you want to delete this department?"
  //   );
  //   if (isConfirmed) {
  //     try {
  //       await adminApiService.deleteDepartment(id);
  //       setDepartments(departments.filter((dept) => dept.id !== id));
  //       setNewDepartmentName("");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };

  const handleDelete = async (departmentId) => {
    setDepartmentToDelete(departmentId);
    setDeleteDialogOpen(true);
  };
  const confirmDelete = async () => {
    try {
      await adminApiService.deleteDepartment(departmentToDelete);
      setDepartments((prevData) =>
        prevData.filter((department) => department.id !== departmentToDelete)
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

  const handleSave = async () => {
    try {
      const response = await adminApiService.updateDepartment(
        newDepartmentName,
        editingDepartmentId
      );
      setNotificationMessage("updated Successfully");
      setNotificationSeverity("success");
      setNotificationOpen(true);
      setDepartments(
        departments.map((dept) =>
          dept.id === editingDepartmentId
            ? { ...dept, dept_name: response.dept_name }
            : dept
        )
      );
      setNewDepartmentName("");
      setEditingDepartmentId(null);
      setUpdateModalOpen(false);
      fetchData();
    } catch (error) {
      console.error(error);
      setNotificationMessage("Failed to update Department. Please try again");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleUpdate = (id, currentDeptName) => {
    setEditingDepartmentId(id);
    setNewDepartmentName(currentDeptName);
    setUpdateModalOpen(true);
  };

  const handleClose = () => {
    setEditingDepartmentId(null);
    setNewDepartmentName("");
    setUpdateModalOpen(false);
  };

  const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

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
          <button onClick={() => setOpen(true)}>Add Department</button>
        </div>

        <Dialog
          open={open}
          onClose={handleCloseModal}
          PaperProps={{ style: { width: "100%" } }}
        >
          <DialogContent>
            <form>
              <label className="AC-SetLabel-Name" htmlFor="departmentName">
                Add Department
              </label>
              <input
                className="Ac-set-input"
                type="text"
                id="departmentName"
                placeholder="Add Your Departments"
                value={newDepartmentName}
                onChange={(e) => setNewDepartmentName(e.target.value)}
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

        {/* <form>
          <label htmlFor="departmentName">Add Department</label>
          <input
            type="text"
            id="departmentName"
            placeholder="Add Your Departments"
            value={newDepartmentName}
            onChange={(e) => setNewDepartmentName(e.target.value)}
          />
          {editingDepartmentId ? (
            <button type="button" onClick={handleSave}>
              UPDATE
            </button>
          ) : (
            <button type="button" onClick={handleAdd}>
              ADD
            </button>
          )}
        </form> */}
      </div>

      <div className="admin-list">
        <div className="master-table ">
          <p className="SCA-heading">CURRENT DEPARTMENT AVAILABLE</p>
          <div className="table-responsive fixe-table">
            <table className="table table-responsive">
              <thead style={{ color: "rgba(0, 0, 0, 0.63)" }} className="thead">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Department Name</th>
                  <th scope="col">UPDATE</th>
                  <th scope="col">DELETE</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((department, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{department.dept_name}</td>
                    <td>
                      <button
                        id="table-btns"
                        onClick={() =>
                          handleUpdate(department.id, department.dept_name)
                        }
                      >
                        <img src={updatebtn} className="up-del-btn" alt="" />
                      </button>
                    </td>
                    <td>
                      <button
                        id="table-btns"
                        onClick={() => handleDelete(department.id)}
                      >
                        <img src={deletebtn} className="up-del-btn" alt="" />
                      </button>
                    </td>
                  </tr>
                ))}

                <Dialog
                  open={updateModalOpen}
                  onClose={handleClose}
                  PaperProps={{ style: { width: "100%" } }}
                >
                  <DialogContent>
                    <form>
                      <label
                        className="AC-SetLabel-Name"
                        htmlFor="departmentName"
                      >
                        Update Department
                      </label>
                      <input
                        className="Ac-set-input"
                        type="text"
                        id="departmentName"
                        placeholder="Add Your Departments"
                        value={newDepartmentName}
                        onChange={(e) => setNewDepartmentName(e.target.value)}
                      />

                      <DialogActions>
                        <button
                          className="submitbtn"
                          type="button"
                          onClick={handleSave}
                        >
                          UPDATE NOW
                        </button>
                        <button onClick={handleClose} className="canclebtn">
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

export default AddDepartment;
