const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  unitType: { type: String },
  street: { type: String },
  streetNumber: { type: String },
  zipcode: { type: Number },
  area: { type: String },
  isOpen: { type: Boolean, defaiult: false },
  images: {
    data: { type: String, required: true }, // Base64-encoded image data
    contentType: { type: String }, // Content type of the image
  },
});

const ApplicationModel = mongoose.model("Application", ApplicationSchema);

module.exports = ApplicationModel;
