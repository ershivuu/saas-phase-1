import React, { useState, useEffect } from "react";
import emailTemplateService from "../../adminApiService";
import updatebtn from "../../../assets/logos/update.png";
import deletebtn from "../../../assets/logos/delete.png";
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
    template_text_2: "",
    template_text_3: "",
    template_text_4: "",
    template_text_5: "",
  });
  const [editTemplateId, setEditTemplateId] = useState(null);

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
      template_text_2: "",
      template_text_3: "",
      template_text_4: "",
      template_text_5: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTemplateData({
      ...templateData,
      [name]: value,
    });
  };

  const handleAddSubmit = async () => {
    try {
      await emailTemplateService.addTemplate(templateData);
      setOpenAddDialog(false);
      const data = await emailTemplateService.getEmailTemplates();
      setTemplates(data);
    } catch (error) {
      console.error("Error adding template:", error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      if (editTemplateId) {
        await emailTemplateService.updateEmailTemplate(
          editTemplateId,
          templateData
        );
        setOpenEditDialog(false);
        const data = await emailTemplateService.getEmailTemplates();
        setTemplates(data);
      }
    } catch (error) {
      console.error("Error updating template:", error);
    }
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
                <th scope="col">Template Text 2</th>
                <th scope="col">Template Text 3</th>
                <th scope="col">Template Text 4</th>
                <th scope="col">Template Text 5</th>
                <th scope="col">EDIT</th>
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
                  <td className="table-cell">
                    {template.template_text_2 || "-"}
                  </td>
                  <td className="table-cell">
                    {template.template_text_3 || "-"}
                  </td>
                  <td className="table-cell">
                    {template.template_text_4 || "-"}
                  </td>
                  <td className="table-cell">
                    {template.template_text_5 || "-"}
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
            variant="standard"
            value={templateData.email_subject}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="from_email"
            label="From Email"
            fullWidth
            variant="standard"
            value={templateData.from_email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="contact_number"
            label="Contact Number"
            fullWidth
            variant="standard"
            value={templateData.contact_number}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="template_name"
            label="Template Name"
            fullWidth
            variant="standard"
            value={templateData.template_name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="template_text_1"
            label="Template Text 1"
            fullWidth
            variant="standard"
            value={templateData.template_text_1}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="template_text_2"
            label="Template Text 2"
            fullWidth
            variant="standard"
            value={templateData.template_text_2}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="template_text_3"
            label="Template Text 3"
            fullWidth
            variant="standard"
            value={templateData.template_text_3}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="template_text_4"
            label="Template Text 4"
            fullWidth
            variant="standard"
            value={templateData.template_text_4}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="template_text_5"
            label="Template Text 5"
            fullWidth
            variant="standard"
            value={templateData.template_text_5}
            onChange={handleChange}
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
            variant="standard"
            value={templateData.email_subject}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="from_email"
            label="From Email"
            fullWidth
            variant="standard"
            value={templateData.from_email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="contact_number"
            label="Contact Number"
            fullWidth
            variant="standard"
            value={templateData.contact_number}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="template_name"
            label="Template Name"
            fullWidth
            variant="standard"
            value={templateData.template_name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="template_text_1"
            label="Template Text 1"
            fullWidth
            variant="standard"
            value={templateData.template_text_1}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="template_text_2"
            label="Template Text 2"
            fullWidth
            variant="standard"
            value={templateData.template_text_2}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="template_text_3"
            label="Template Text 3"
            fullWidth
            variant="standard"
            value={templateData.template_text_3}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="template_text_4"
            label="Template Text 4"
            fullWidth
            variant="standard"
            value={templateData.template_text_4}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="template_text_5"
            label="Template Text 5"
            fullWidth
            variant="standard"
            value={templateData.template_text_5}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleEditSubmit}>Update Template</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EmailTemplatesList;
