const express = require("express");
const router = express.Router();
const {
  createApplication,
  getApplications,
  getOneApplication,
} = require("../controllers/applicationsController.js");

// Create a new application
router.post("/applications", createApplication);
router.get("/applications", getApplications);
router.get("/applications/:id", getOneApplication);

module.exports = router;
