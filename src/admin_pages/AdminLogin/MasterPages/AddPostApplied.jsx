import React, { useState, useEffect } from "react";
import "./Master.css";

import updatebtn from "../../../assets/logos/update.png";
import deletebtn from "../../../assets/logos/delete.png";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import adminApiService from "../../adminApiService";
import Notification from "../../../Notification/Notification";
function AddPostApplied() {
  const [data, setData] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [postToDelete, setPostToDelete] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");
  const [notificationOpen, setNotificationOpen] = useState(false);
  // ------------------Fetching Data from job_category_master-id-------------------------------

  function getJobCategory() {
    try {
      adminApiService
        .getJobCategory()
        .then((data) => {
          setCategories(data);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  }
  useEffect(() => {
    getPost();
    getJobCategory();
  }, [categories.category_name]);

  // ------------------GET DATA FROM API--------------------------------
  function getPost() {
    adminApiService
      .getPosts()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const handleAddPost = () => {
    if (!selectedCategoryId) {
      console.error("Please select a category.");
      return;
    }

    adminApiService
      .addPost(newCategory, selectedCategoryId)
      .then(() => {
        setNotificationMessage("Added Successfully.");
        setNotificationSeverity("success");
        setNotificationOpen(true);
        setNewCategory("");
        setOpen(false);
        handleCloseModal();
        getPost();
      })
      .catch((error) => console.error(error));
    setNotificationMessage("error during added Post");
    setNotificationSeverity("error");
    setNotificationOpen(true);
  };

  // ------------------DELETE DATA FROM API--------------------------------

  // const handleDeletePost = async (categoryId) => {
  //   const isConfirmed = window.confirm(
  //     "Are you sure you want to delete this post?"
  //   );
  //   if (isConfirmed) {
  //     try {
  //       const response = await adminApiService.deletePost(categoryId);
  //       if (response && response.status === 200) {
  //         setData(data.filter((category) => category.id !== categoryId));
  //       } else {
  //         console.error("Error deleting category");
  //       }
  //     } catch (error) {
  //       console.error("Error deleting category:", error.message);
  //     }
  //   }
  // };

  const handleDeletePost = async (categoryId) => {
    setPostToDelete(categoryId);
    setDeleteDialogOpen(true);
  };
  const confirmDelete = async () => {
    try {
      await adminApiService.deletePost(postToDelete);
      setData((prevData) =>
        prevData.filter((category) => category.id !== postToDelete)
      );
      setNotificationMessage("Deleted Successfully.");
      setNotificationSeverity("success");
      setNotificationOpen(true);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting Post:", error);
      setNotificationMessage("Failed to delete Post. Please try again");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleSelectCategory = (e) => {
    const categoryId = e.target.value;
    const selectedCategoryObj = categories.find(
      (category) => category.id === categoryId
    );

    setSelectedCategoryId(categoryId);
    setSelectedCategory(selectedCategoryObj);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
  };

  // ------------------UPDATE DATA IN API--------------------------------

  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const handleCloseModal = () => {
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "900",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleSelectPostForUpdate = (postId) => {
    const selectedPost = data.find((post) => post.id === postId);
    setSelectedPost(selectedPost);
    setUpdateModalOpen(true);
  };
  const handleUpdatePost = async () => {
    try {
      await adminApiService.updatePost(selectedPost);
      setNotificationMessage("Updated Successfully.");
      setNotificationSeverity("success");
      setNotificationOpen(true);
      handleCloseUpdateModal();
      getPost();
    } catch (error) {
      // console.error("Error updating post:", error);
      setNotificationMessage("Error updating post");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
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
          <button onClick={() => setOpen(true)}>Add Post Applied</button>
        </div>
        {open && (
          <Dialog
            onClose={handleCloseModal}
            open={true}
            PaperProps={{ style: { width: "100%" } }}
          >
            <DialogContent>
              <form>
                <div>
                  <label className="AC-SetLabel-Name">Select Category</label>
                  <select
                    name="category"
                    className="select-jc"
                    value={selectedCategoryId}
                    onChange={handleSelectCategory}
                  >
                    <option value="">Select Category</option>
                    {categories &&
                      categories.length > 0 &&
                      categories.map((category, index) => (
                        <option key={index} value={category.id}>
                          {category?.category_name || ""}
                        </option>
                      ))}
                  </select>
                </div>

                <label
                  style={{ marginTop: "20px" }}
                  className="AC-SetLabel-Name"
                  htmlFor="categoryInput"
                >
                  Add Post Applied For
                </label>
                <input
                  type="text"
                  className="Ac-set-input"
                  id="categoryInput"
                  placeholder="Add Post"
                  value={
                    selectedCategory ? selectedCategory.post_name : newCategory
                  }
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (selectedCategory) {
                      setSelectedCategory((prev) => ({
                        ...prev,
                        post_name: newValue,
                      }));
                    } else {
                      setNewCategory(newValue);
                    }
                  }}
                />

                {/* <button id="set-btn" type="button" onClick={handleAddPost}>
                      ADD NOW
                    </button> */}
                <DialogActions>
                  <button
                    className="submitbtn"
                    type="button"
                    onClick={handleAddPost}
                  >
                    ADD NOW
                  </button>
                  <button onClick={handleCloseModal} className="canclebtn">
                    Cancle
                  </button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div className="admin-list">
        <div className="master-table ">
          <p className=" SCA-heading">CURRENT APPLIED POST AVAILABLE</p>
          <div className="table-responsive fixe-table">
            <table className="table table-responsive">
              <thead style={{ color: "rgba(0, 0, 0, 0.63)" }} className="thead">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">POST</th>
                  <th scope="col">CATEGORY</th>
                  <th scope="col">UPDATE</th>
                  <th scope="col">DELETE</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((category, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{category.post_name || ""}</td>
                      <td>
                        {category.job_category_master &&
                        category.job_category_master.category_name
                          ? category.job_category_master.category_name
                          : ""}
                      </td>
                      <td>
                        <button
                          id="table-btns"
                          onClick={() => handleSelectPostForUpdate(category.id)}
                        >
                          <img src={updatebtn} className="up-del-btn" alt="" />
                        </button>
                      </td>
                      <td>
                        <button
                          id="table-btns"
                          onClick={() => handleDeletePost(category.id)}
                        >
                          <img src={deletebtn} className="up-del-btn" alt="" />
                        </button>
                      </td>
                    </tr>
                  ))}

                <Dialog
                  onClose={handleCloseUpdateModal}
                  open={updateModalOpen}
                  PaperProps={{ style: { width: "100%" } }}
                >
                  <DialogContent>
                    <form>
                      <div>
                        <label className="AC-SetLabel-Name">
                          Select Category
                        </label>
                        <select
                          name="category"
                          className="select-jc"
                          value={selectedPost?.job_category_master?.id || ""}
                          onChange={(e) => {
                            const selectedCategoryId = parseInt(e.target.value);
                            const selectedCategory = categories.find(
                              (category) => category.id === selectedCategoryId
                            );
                            setSelectedPost((prevState) => ({
                              ...prevState,
                              job_category_master: selectedCategory,
                            }));
                          }}
                        >
                          {categories.map((category, index) => (
                            // <option key={category.id} value={category.id}>
                            //   {category && category.category_name && category.category_name || ""}
                            // </option>
                            <option key={index} value={category.id}>
                              {category && category.category_name
                                ? category.category_name
                                : ""}
                            </option>
                          ))}
                        </select>
                      </div>

                      <label
                        style={{ marginTop: "20px" }}
                        className="AC-SetLabel-Name"
                        htmlFor="categoryInput"
                      >
                        Add Post Applied For
                      </label>
                      <input
                        type="text"
                        className="select-jc"
                        id="categoryInput"
                        placeholder="Add Post"
                        value={selectedPost ? selectedPost.post_name : ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          // console.log("Selected post name:", value);
                          setSelectedPost((prevState) => ({
                            ...prevState,
                            post_name: value,
                          }));
                        }}
                      />
                      <DialogActions>
                        <button
                          className="submitbtn"
                          type="button"
                          onClick={handleUpdatePost}
                        >
                          UPDATE NOW
                        </button>
                        <button
                          onClick={handleCloseModal}
                          className="canclebtn"
                        >
                          Cancle
                        </button>
                      </DialogActions>
                      {/* <button
                        id="set-btn"
                        type="button"
                        onClick={handleUpdatePost}
                      >
                        UPDATE NOW
                      </button> */}
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
          Are you sure you want to delete this Post?
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

export default AddPostApplied;
