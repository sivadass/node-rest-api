const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    addressLine1: {
      type: String,
      required: true,
      min: 6,
      max: 200
    },
    addressLine2: {
      type: String,
      min: 6,
      max: 200
    },
    state: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    pincode: {
      type: Number,
      required: true,
      min: 6,
      max: 6
    },
    phoneNumber: {
      type: Number,
      required: true,
      min: 10,
      max: 10
    },
    fullName: {
      type: String,
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Address", addressSchema);
