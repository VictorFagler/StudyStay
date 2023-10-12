const ListingModel = require("../models/listing");

// Create a new listing
const createListing = async (req, res) => {
  try {
    const {
      unitType,
      street,
      streetNumber,
      //   description,
      city,
      zipcode,
      //   price,
      //   period,
      //   rooms,
      //   pictures,
    } = req.body;

    // Input validation
    if (!unitType || !street) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create a new listing in the database
    const newListing = await ListingModel.create({
      unitType,
      street,
      streetNumber,
      //   description,
      city,
      zipcode,
      // price,
      // period,
      //   rooms,
      //   pictures,
    });

    return res.status(201).json(newListing);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the listing." });
  }
};

module.exports = {
  createListing,
};
