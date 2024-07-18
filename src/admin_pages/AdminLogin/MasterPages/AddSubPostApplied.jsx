import React, { useState, useEffect } from "react";
import updatebtn from "../../../assets/logos/update.png";
import deletebtn from "../../../assets/logos/delete.png";
// import { BASE_URL } from "../../../config/config";
import Notification from "../../../Notification/Notification";

import adminApiService from "../../adminApiService";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
function AddSubPostApplied() {
  const [data, setData] = useState([]);
  const [postData, setPostData] = useState([]);

  const [selectedPostId, setSelectedPostId] = useState("");
  const [newPost, setNewPost] = useState("");

  const [open, setOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [subPostToDelete, setSubPostToDelete] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");
  const [notificationOpen, setNotificationOpen] = useState(false);

  // -----------------------------Fetching data from applied_subpost------------------------------
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    adminApiService
      .fetchAppliedSubPosts()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // -----------------------------Fetching data from applied_subpost------------------------------
  // -----------------------------Fetching data from applied_post------------------------------
  useEffect(() => {
    fetchAppliedPost();
  }, []);

  const fetchAppliedPost = () => {
    adminApiService
      .getPosts()
      .then((data) => {
        setPostData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleSelectPost = (e) => {
    const selectedPostId = e.target.value;
    const selectedPostObj = postData.find((post) => post.id === selectedPostId);
    setSelectedPostId(selectedPostId);
    setSelectedPost(selectedPostObj);
  };

  const handleAddSubPost = () => {
    if (!selectedPostId) {
      console.error("Please select a category.");
      return;
    }
    adminApiService
      .addSubPost(selectedPostId, newPost)
      .then((response) => {
        setNotificationMessage("Added Successfully.");
        setNotificationSeverity("success");
        setNotificationOpen(true);
        setData([...data, response]);
        setNewPost("");
        fetchData();
        setOpen(false);
      })
      .catch((error) => console.error(error));
    setNotificationMessage("error during added SubPost");
    setNotificationSeverity("error");
    setNotificationOpen(true);
  };

  // -----------------------------Fetching data from applied_post------------------------------

  // const handleDeleteSubPost = (subPostId) => {
  //   const isConfirmed = window.confirm(
  //     "Are you sure you want to delete this subpost?"
  //   );
  //   if (isConfirmed) {
  //     adminApiService
  //       .deleteSubPost(subPostId)
  //       .then(() => {
  //         fetchData();
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // };

  const handleDeleteSubPost = async (subPostId) => {
    setSubPostToDelete(subPostId);
    setDeleteDialogOpen(true);
  };
  const confirmDelete = async () => {
    try {
      await adminApiService.deleteSubPost(subPostToDelete);
      setData((prevData) =>
        prevData.filter((subpost) => subpost.id !== subPostToDelete)
      );
      setNotificationMessage("Deleted Successfully.");
      setNotificationSeverity("success");
      setNotificationOpen(true);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting job profile:", error);
      setNotificationMessage("Failed to delete SubPost. Please try again");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };
  const [selectedPost, setSelectedPost] = useState("");
  const [updatePost, setUpdatePost] = useState("");
  const handleOpenUpdateModal = (SubPostID) => {
    const selectedSubPost = data.find((subpost) => subpost.id === SubPostID);
    // console.log("Selected Post:", selectedSubPost.applied_post_master.post_name);
    // console.log("Selected Subpost Name:", selectedSubPost.subpost_name);
    setSelectedPost(selectedSubPost); // Set the selected subpost id
    setUpdatePost(selectedSubPost.subpost_name); // Set the update post name
    setUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedPost(null);
    setUpdatePost("");
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleUpdateSubPost = () => {
    adminApiService
      .updateSubPost(selectedPost, updatePost)
      .then(() => {
        setNotificationMessage("Updated Successfully.");
        setNotificationSeverity("success");
        setNotificationOpen(true);
        fetchData();
        setUpdatePost("");
        setUpdateModalOpen(false);
      })
      .catch((error) => {
        console.error(error);
        setNotificationMessage("error during update SubPost");
        setNotificationSeverity("error");
        setNotificationOpen(true);
      });
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
          <button onClick={() => setOpen(true)}>Add Sub post</button>
        </div>

        <Dialog
          open={open} // Control the open state of the modal
          onClose={() => setOpen(false)}
          PaperProps={{ style: { width: "100%" } }}
        >
          <DialogContent>
            <form>
              <label className="AC-SetLabel-Name" htmlFor="postSelect">
                Select Post:
              </label>
              <select
                id="postSelect"
                value={selectedPostId}
                className="select-jc"
                onChange={(e) => handleSelectPost(e)} // Pass the event object directly
              >
                <option value="">Select Post</option>
                {postData.map((post, index) => (
                  <option key={index} value={post.id}>
                    {post.post_name}
                  </option>
                ))}
              </select>

              <label
                style={{ marginTop: "20px" }}
                className="AC-SetLabel-Name"
                htmlFor=""
              >
                Add Sub Post Applied For
              </label>

              <input
                type="text"
                id=""
                className="Ac-set-input"
                placeholder="Sub Post Applied For"
                value={selectedPost ? selectedPost.post_name : newPost}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (selectedPost) {
                    setSelectedPost((prev) => ({
                      ...prev,
                      subpost_name: newValue,
                    }));
                  } else {
                    setNewPost(newValue);
                  }
                }}
              />
              <DialogActions>
                <button
                  className="submitbtn"
                  type="button"
                  onClick={handleAddSubPost}
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
      </div>
      <div className="new-admin-list">
        <div className="master-table">
          <p className="SCA-heading">CURRENT APPLIED SUB POST AVAILABLE</p>
          <div className="table-responsive fixe-table">
            <table className="table table-responsive">
              <thead style={{ color: "rgba(0, 0, 0, 0.63)" }} className="thead">
                <tr>
                  <th scope="col">ID</th>
                  {/* <th scope="col">Post</th> */}
                  <th scope="col">Sub Post</th>
                  <th scope="col">Post</th>
                  <th scope="col">UPDATE</th>
                  <th scope="col">DELETE</th>
                </tr>
              </thead>
              <tbody>
                {data.map((subPost, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    {/* <td>{subPost.applied_post_master.post_name}</td> */}
                    <td>{subPost.subpost_name}</td>
                    <td>{subPost?.applied_post_master?.post_name}</td>
                    <td>
                      <button id="table-btns">
                        <img
                          onClick={() => handleOpenUpdateModal(subPost.id)}
                          src={updatebtn}
                          className="up-del-btn"
                          alt=""
                        />
                      </button>
                    </td>
                    <td>
                      <button
                        id="table-btns"
                        onClick={() => handleDeleteSubPost(subPost.id)}
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
                      <label className="AC-SetLabel-Name" htmlFor="postSelect">
                        Select Post:
                      </label>
                      <select
                        id="postSelect"
                        className="select-jc"
                        value={
                          selectedPost
                            ? selectedPost.applied_post_master.id
                            : ""
                        }
                        onChange={(e) => {
                          const selectedPostId = parseInt(e.target.value);
                          const selectedPostData = postData.find(
                            (post) => post.id === selectedPostId
                          );
                          // console.log("selectedPost>>>>>>",selectedPostId)
                          setSelectedPost((prevState) => ({
                            ...prevState,
                            applied_post_master: selectedPostData,
                          }));
                          setUpdatePost("");
                        }}
                      >
                        <option value="">Select Post</option>
                        {postData.map((post, index) => (
                          <option key={index} value={post.id}>
                            {post?.post_name}
                          </option>
                        ))}
                      </select>

                      <label
                        style={{ marginTop: "20px" }}
                        className="AC-SetLabel-Name"
                        htmlFor=""
                      >
                        Update Sub Post Applied For
                      </label>

                      <input
                        type="text"
                        id=""
                        value={updatePost}
                        className="Ac-set-input"
                        placeholder="Sub Post Applied For"
                        onChange={(e) => {
                          setUpdatePost(e.target.value);
                          // console.log("Updated sub post:", e.target.value);
                        }}
                      />

                      <DialogActions>
                        <button
                          className="submitbtn"
                          type="button"
                          onClick={handleUpdateSubPost}
                        >
                          UPDATE NOW
                        </button>
                        <button
                          onClick={handleCloseUpdateModal}
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
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Catgeory</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this SubPost?
        </DialogContent>
        <DialogActions>
          <button className="submitbtn" onClick={confirmDelete}>
            Delete
          </button>
          <button className="canclebtn" onClick={handleCloseDeleteDialog}>
            Cancel
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddSubPostApplied;
