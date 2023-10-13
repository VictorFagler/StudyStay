const ListingModel = require("../models/listing");

// Create a new listing
const createListing = async (req, res) => {
  try {
    const { unitType, street, streetNumber, city, zipcode, image } = req.body;

    // Input validation
    if (!unitType || !street) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create a new listing in the database
    const newListing = await ListingModel.create({
      unitType,
      street,
      streetNumber,
      city,
      zipcode,
      images: [
        {
          data: image, // Use req.body.image to access the image data
          contentType: "image/jpeg", // Modify this based on the image type
        },
      ],
    });

    return res.status(201).json(newListing);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the listing." });
  }
};

// Get all listings
const getListings = async (req, res) => {
  try {
    const listings = await ListingModel.find();
    return res.status(200).json(listings);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching listings." });
  }
};

module.exports = {
  createListing,
  getListings,
};
