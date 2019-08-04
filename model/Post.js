const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 6,
    max: 200
  },
  description: {
    type: String,
    required: true,
    min: 6
  },
  createdBy: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Post", postSchema);
