const mongoose = require("mongoose");
const { Schema } = mongoose;

const listingSchema = new Schema({
  unitType: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  streetNumber: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  city: {
    type: String,
    // required: true,
  },
  zipcode: {
    type: Number,
    // required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  floor: {
    type: Number,
    required: true,
  },
  //   period: {
  //     type: String,
  //     required: true,
  //   },
  rooms: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    // required: true,
  },
  size: {
    type: Number,
    // required: true,
  },
  amenities: {
    type: String,
    // required: true,
  },
  images: [
    {
      data: [String, String], // Store image data as a Buffer
      contentType: String, // Define the content type (e.g., "image/jpeg", "image/png")
    },
  ],
});

const ListingModel = mongoose.model("Listing", listingSchema);

module.exports = ListingModel;
