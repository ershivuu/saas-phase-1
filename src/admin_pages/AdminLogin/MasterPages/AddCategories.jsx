import React, { useState, useEffect } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import updatebtn from "../../../assets/logos/update.png";
import deletebtn from "../../../assets/logos/delete.png";
import adminApiService from "../../adminApiService";
import Notification from "../../../Notification/Notification";

function AddCategories() {
  const [data, setData] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null); // New state for tracking the selected category for update
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");
  const [notificationOpen, setNotificationOpen] = useState(false);

  // ------------------GET DATA FROM API--------------------------------

  const getJobCategory = async () => {
    try {
      const response = await adminApiService.getJobCategories();
      setData(response.data);
    } catch {
      console.error("Error fetching data:");
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await adminApiService.AddCategory({
        category_name: newCategory,
      });
      setData([...data, response.data]);
      setNotificationMessage("Adding NewCategory successfully");
      setNotificationSeverity("success");
      setNotificationOpen(true);
      setNewCategory("");
      setOpen(false);
      getJobCategory();
    } catch (error) {
      console.error("Error adding newCategory:", error);
      setNotificationMessage("Error adding newCategory");
      setNotificationSeverity("error");
      setNotificationOpen(true);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        setNotificationMessage("An error occurred while adding newCategory");
        setNotificationSeverity("error");
        setNotificationOpen(true);
      }
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    setCategoryToDelete(categoryId);
    setDeleteDialogOpen(true);
  };
  const confirmDelete = async () => {
    try {
      await adminApiService.DeleteCategory(categoryToDelete);
      setData((prevData) =>
        prevData.filter((category) => category.id !== categoryToDelete)
      );
      setNotificationMessage("Deleted Successfully.");
      setNotificationSeverity("success");
      setNotificationOpen(true);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting job profile:", error);
      setNotificationMessage("Failed to delete job profile. Please try again");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleUpdateCategory = async () => {
    if (!selectedCategory) return;
    const updateID = selectedCategory.id;
    try {
      const response = await adminApiService.updateCategory(updateID, {
        category_name: selectedCategory.category_name,
      });
      setData(
        data.map((category) =>
          category.id === selectedCategory.id ? response.data : category
        )
      );
      setNotificationMessage("Updated Successfully.");
      setNotificationSeverity("success");
      setNotificationOpen(true);
      setSelectedCategory(null);
      setUpdateModalOpen(false);
      getJobCategory();
    } catch (error) {
      console.error("Error updating category:", error);
      setNotificationMessage("Error updating category!");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  useEffect(() => {
    getJobCategory();
  }, []);

  const handleSelectCategoryForUpdate = (categoryId) => {
    const selectedCategory = data.find(
      (category) => category.id === categoryId
    );
    setSelectedCategory(selectedCategory);

    setUpdateModalOpen(true);
  };

  // ------------------UPDATE DATA IN API--------------------------------

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setNewCategory();
    setSelectedCategory();
  };

  const handleXButtonClick = () => {
    if (updateModalOpen) {
      setUpdateModalOpen(false);
    } else {
      setOpen(false);
    }
    setOpen(false);
    setNewCategory();
    setSelectedCategory();
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
          <button onClick={handleOpen}>Add Categories</button>
        </div>

        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{ style: { width: "100%" } }}
        >
          <DialogContent>
            <form>
              <label className="AC-SetLabel-Name" htmlFor="categoryInput">
                Add Job Category
              </label>

              <input
                className="Ac-set-input"
                type="text"
                id="categoryInput"
                placeholder="Add Categories"
                value={
                  selectedCategory
                    ? selectedCategory.category_name
                    : newCategory
                }
                onChange={(e) => {
                  if (selectedCategory) {
                    setSelectedCategory({
                      ...selectedCategory,
                      category_name: e.target.value,
                    });
                  } else {
                    setNewCategory(e.target.value);
                  }
                }}
              />
              <div className="">
                <div className="category-publish-btn">
                  <p>Publish To Job Profile</p>
                  <label className="switch">
                    <input type="checkbox" id="checkbox" />
                    <div className="slider round"></div>
                  </label>
                </div>
              </div>

              <DialogActions>
                <button
                  className="submitbtn"
                  type="button"
                  onClick={handleAddCategory}
                >
                  ADD NOW
                </button>
                <button onClick={handleXButtonClick} className="canclebtn">
                  Cancle
                </button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {/* -------------------------update form ---------------------------------------- */}
      <div className="admin-list">
        <div className="master-table">
          <p className="SCA-heading">CURRENT CATEGORIES AVAILABLE</p>
          <div className="table-responsive fixe-table">
            <table className="table table-responsive">
              <thead style={{ color: "rgba(0, 0, 0, 0.63)" }} className="thead">
                <tr>
                  <th scope="col">S No.</th>
                  <th scope="col">NAME</th>
                  <th scope="col">UPDATE</th>
                  <th scope="col">DELETE</th>
                </tr>
              </thead>
              <tbody>
                {data.map((category, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{category?.category_name}</td>
                    <td>
                      <button
                        id="table-btns"
                        onClick={() =>
                          handleSelectCategoryForUpdate(category?.id)
                        }
                      >
                        <img src={updatebtn} className="up-del-btn" alt="" />
                      </button>
                    </td>
                    <td>
                      <button
                        id="table-btns"
                        onClick={() => handleDeleteCategory(category.id)}
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
                      <label
                        className="AC-SetLabel-Name"
                        htmlFor="categoryInput"
                      >
                        Update Job Category
                      </label>

                      <input
                        className="Ac-set-input"
                        type="text"
                        id="categoryInput"
                        placeholder="Update Category"
                        value={
                          selectedCategory
                            ? selectedCategory?.category_name
                            : ""
                        }
                        onChange={(e) =>
                          setSelectedCategory({
                            ...selectedCategory,
                            category_name: e.target.value,
                          })
                        }
                      />
                    </form>
                    <DialogActions>
                      <button
                        className="submitbtn"
                        type="button"
                        onClick={handleUpdateCategory}
                      >
                        UPDATE NOW
                      </button>
                      <button
                        onClick={handleXButtonClick}
                        className="canclebtn"
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
          Are you sure you want to delete this Category?
        </DialogContent>
        <DialogActions>
          <button className="submitbtn" onClick={confirmDelete}>
            Delete
          </button>
          <button onClick={handleCloseDeleteDialog} className="canclebtn">
            Cancel
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddCategories;
