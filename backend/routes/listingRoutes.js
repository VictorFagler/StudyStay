const express = require("express");
const router = express.Router();
const {
  createListing,
  getListings,
  getOneListing,
} = require("../controllers/listingController");

// Create a new listing
router.post("/listings", createListing);
router.get("/listings", getListings);
router.get("/listings/:id", getOneListing);

// Define other listing-related routes as needed
// For example, you can add routes to retrieve, update, or delete listings.

module.exports = router;
