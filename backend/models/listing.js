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
    type: Number,
    required: true,
  },
  //   description: {
  //     type: String,
  //     required: true,
  //   },
  city: {
    type: String,
    required: true,
  },
  zipcode: {
    type: Number,
    required: true,
  },
  //   price: {
  //     type: Number,
  //     required: true,
  //   },
  //   period: {
  //     type: String,
  //     required: true,
  //   },
  //   rooms: {
  //     type: Number,
  //     required: true,
  //   },
  //   pictures: {
  //     type: [String],
  //     validate: {
  //       validator: function (arr) {
  //         return arr.length >= 1 && arr.length <= 5;
  //       },
  //       message: "You must provide between 1 and 5 pictures.",
  //     },
  //     required: true,
  //   },
});

const ListingModel = mongoose.model("Listing", listingSchema);

module.exports = ListingModel;
