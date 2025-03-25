const express = require("express");
const { submitContactForm, getAllComplaints } = require("../controllers/contactController");
const contactRoutes = express.Router();

// Route to submit a complaint
contactRoutes.post("/submit", submitContactForm);

// Route to get all complaints (for admin)
contactRoutes.get("/all", getAllComplaints);

module.exports = contactRoutes;
