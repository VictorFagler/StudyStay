const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  applications: [
    {
      unitType: { type: String },
      street: { type: String },
      streetNumber: { type: String },
      zipcode: { type: Number },
      area: { type: String },
      isOpen: { type: Boolean, defaiult: false },
      images: [
        {
          data: [String, String], // Store image data as a Buffer
          contentType: String, // Define the content type (e.g., "image/jpeg", "image/png")
        },
      ],
      // type: Schema.Types.ObjectId,
      // ref: "Application",
    },
  ],
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
