const express = require("express");
const router = express.Router();
const { createListing } = require("../controllers/listingController");

// Create a new listing
router.post("/listings", createListing);

// Define other listing-related routes as needed
// For example, you can add routes to retrieve, update, or delete listings.

module.exports = router;
