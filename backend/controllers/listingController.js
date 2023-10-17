const ListingModel = require("../models/listing");
// Create a new listing
const createListing = async (req, res) => {
  try {
    const {
      unitType,
      street,
      streetNumber,
      city,
      zipcode,
      price,
      rooms,
      floor,
      date,
      size,
      amenities,
      image,
    } = req.body;

    // Input validation
    if (!unitType || !street) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const amenitiesAsString = amenities.join(", ");
    // Create a new listing in the database
    const newListing = await ListingModel.create({
      unitType,
      street,
      streetNumber,
      city,
      zipcode,
      price,
      rooms,
      floor,
      date,
      size,
      amenities: amenitiesAsString,
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
const getOneListing = async (req, res) => {
  const itemId = req.params.id;

  try {
    const item = await ListingModel.findOne({ _id: itemId });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getOneListing,
  createListing,
  getListings,
};
