import React, { useState, useEffect } from "react";
import emailTemplateService from "../../adminApiService";
import updatebtn from "../../../assets/logos/update.png";
import Notification from "../../../Notification/Notification";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

const EmailTemplatesList = () => {
  const [templates, setTemplates] = useState([]);
  const [error, setError] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [templateData, setTemplateData] = useState({
    email_subject: "",
    from_email: "",
    contact_number: "",
    template_name: "",
    template_text_1: "",
  });
  const [originalTemplateData, setOriginalTemplateData] = useState({});
  const [editTemplateId, setEditTemplateId] = useState(null);

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");


  const [errors, setErrors] = useState({
    email_subject: "",
    from_email: "",
    contact_number: "",
    template_name: "",
    template_text_1: "",
  });

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await emailTemplateService.getEmailTemplates();
        setTemplates(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTemplates();
  }, []);

  const handleClickOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleClickOpenEditDialog = (template) => {
    setTemplateData(template);
    setOriginalTemplateData(template); // Store original data
    setEditTemplateId(template.id);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditTemplateId(null);
    setTemplateData({
      email_subject: "",
      from_email: "",
      contact_number: "",
      template_name: "",
      template_text_1: "",
    });
    setOriginalTemplateData({});
  };


  const validateField = (name, value) => {
    switch (name) {
      case "email_subject":
      case "template_name":
      case "template_text_1":
        return value ? "" : "This field is required";
      case "from_email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? "" : "Invalid email address";
      case "contact_number":
        const contactRegex = /^\d{10,}$/;
        return contactRegex.test(value) ? "" : "Invalid contact number";
      default:
        return "";
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setTemplateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate field dynamically
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleAddSubmit = async () => {
    const newErrors = Object.keys(templateData).reduce((acc, key) => {
      const error = validateField(key, templateData[key]);
      if (error) acc[key] = error;
      return acc;
    }, {});

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;
    try {
      const response = await emailTemplateService.addTemplate(templateData);
      setNotificationMessage(response.message);
      setNotificationSeverity("success");
      setNotificationOpen(true);
      setOpenAddDialog(false);
      const data = await emailTemplateService.getEmailTemplates();
      setTemplates(data);
    } catch (error) {
      setNotificationMessage(error.message);
      setNotificationSeverity("error");
      setNotificationOpen(true);
      console.error("Error adding template:", error);
    }
  };

  const handleEditSubmit = async () => {
    const newErrors = Object.keys(templateData).reduce((acc, key) => {
      const error = validateField(key, templateData[key]);
      if (error) acc[key] = error;
      return acc;
    }, {});

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;
    try {
      if (editTemplateId) {
        // Compare original and current data to get updated fields
        const updatedFields = Object.keys(templateData).reduce((acc, key) => {
          if (templateData[key] !== originalTemplateData[key]) {
            acc[key] = templateData[key];
          }
          return acc;
        }, {});

        const response = await emailTemplateService.updateEmailTemplate(editTemplateId, updatedFields);
        setNotificationMessage(response.message);
        setNotificationSeverity("success");
        setNotificationOpen(true);
        setOpenEditDialog(false);
        const data = await emailTemplateService.getEmailTemplates();
        setTemplates(data);
      }
    } catch (error) {
      setNotificationMessage(error.message);
      setNotificationSeverity("error");
      setNotificationOpen(true);
      console.error("Error updating template:", error);
    }
  };

  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  return (
    <>
      <div className="container-1">
        <div className="new-opening-btn">
          <button onClick={handleClickOpenAddDialog}>Add Template</button>
        </div>
      </div>

      <div className="admin-list">
        <p className="SCA-heading">Email Template</p>
        <div className="table-responsive fixe-table">
          <table className="table table-responsive">
            <thead style={{ color: "rgba(0, 0, 0, 0.63)" }} className="thead">
              <tr>
                <th scope="col">S No.</th>
                <th scope="col">Email Subject</th>
                <th scope="col">From Email</th>
                <th scope="col">Contact Number</th>
                <th scope="col">Template Name</th>
                <th scope="col">Template Text 1</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {templates.map((template, index) => (
                <tr key={template.id}>
                  <td>{index + 1}</td>
                  <td className="table-cell">
                    {template.email_subject || "-"}
                  </td>
                  <td className="table-cell">{template.from_email || "-"}</td>
                  <td className="table-cell">
                    {template.contact_number || "-"}
                  </td>
                  <td className="table-cell">
                    {template.template_name || "-"}
                  </td>
                  <td className="table-cell">
                    {template.template_text_1 || "-"}
                  </td>
                  <td>
                    <button
                      id="table-btns"
                      onClick={() => handleClickOpenEditDialog(template)}
                    >
                      <img
                        src={updatebtn}
                        className="up-del-btn"
                        alt="Update"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Template Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New Template</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="email_subject"
            label="Email Subject"
            fullWidth
            value={templateData.email_subject}
            onChange={handleChange}
            error={!!errors.email_subject}
            helperText={errors.email_subject}
          />
          <TextField
            margin="dense"
            name="from_email"
            label="From Email"
            fullWidth
            value={templateData.from_email}
            onChange={handleChange}
            error={!!errors.from_email}
            helperText={errors.from_email}
            
          />
          <TextField
            margin="dense"
            name="contact_number"
            label="Contact Number"
            fullWidth
            value={templateData.contact_number}
            onChange={handleChange}
            error={!!errors.contact_number}
            helperText={errors.contact_number}
          />
          <TextField
            margin="dense"
            name="template_name"
            label="Template Name"
            fullWidth
            value={templateData.template_name}
            onChange={handleChange}
            error={!!errors.template_name}
            helperText={errors.template_name}
          />
          <TextField
            margin="dense"
            name="template_text_1"
            label="Template Text 1"
            fullWidth
            value={templateData.template_text_1}
            onChange={handleChange}
            error={!!errors.template_text_1}
            helperText={errors.template_text_1}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button onClick={handleAddSubmit}>Add Template</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Template Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Template</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="email_subject"
            label="Email Subject"
            fullWidth
            value={templateData.email_subject}
            onChange={handleChange}
            error={!!errors.email_subject}
            helperText={errors.email_subject}
          />
          <TextField
            margin="dense"
            name="from_email"
            label="From Email"
            fullWidth
            value={templateData.from_email}
            onChange={handleChange}
            error={!!errors.from_email}
            helperText={errors.from_email}

          />
          <TextField
            margin="dense"
            name="contact_number"
            label="Contact Number"
            fullWidth
            value={templateData.contact_number}
            onChange={handleChange}
            error={!!errors.contact_number}
            helperText={errors.contact_number}
          />
          <TextField
            margin="dense"
            name="template_name"
            label="Template Name"
            fullWidth
            value={templateData.template_name}
            onChange={handleChange}
            error={!!errors.template_name}
            helperText={errors.template_name}

          />
          <TextField
            margin="dense"
            name="template_text_1"
            label="Template Text 1"
            fullWidth
            value={templateData.template_text_1}
            onChange={handleChange}
            error={!!errors.template_text_1}
            helperText={errors.template_text_1}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleEditSubmit}>Save Changes</Button>
        </DialogActions>
      </Dialog>

      <Notification
        open={notificationOpen}
        handleClose={handleCloseNotification}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity} // Corrected prop name here
      />
    </>
  );
};

export default EmailTemplatesList;
