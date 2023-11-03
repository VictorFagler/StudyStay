const mongoose = require("mongoose");
const { Schema } = mongoose;

const applicationSchema = new Schema({
  propertyId: { type: Schema.Types.ObjectId, ref: "Property" }, // Reference to the Property model
  propertyName: { type: String },
  applicationDate: { type: Date, default: Date.now },
  // Add more application details as needed
});

const ApplicationModel = mongoose.model("Application", applicationSchema);

module.exports = ApplicationModel;
