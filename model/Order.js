const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product"
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        }
      }
    ],
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "dispatched",
        "failed",
        "on-hold",
        "completed",
        "cancelled",
        "refunded"
      ],
      default: "pending"
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

module.exports = mongoose.model("Order", orderSchema);
