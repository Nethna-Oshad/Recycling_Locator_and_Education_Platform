const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  emergencyRequestType: {
    type: String,
    enum: [
      "glass_waste",
      "medical_waste",
      "hazardous_waste",
      "electronic_waste",
      "construction_waste",
      "others",
    ],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requestStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending", // Hidden from the user, no input required
  },
  requestDate: {
    type: Date,
    default: Date.now,
  },
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
