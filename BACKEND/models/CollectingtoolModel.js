// models/CollectingtoolModel.js
const mongoose = require("mongoose");

const collectingToolSchema = new mongoose.Schema({
  itemNo: {                     // Changed from toolName to itemNo
    type: String,
    required: true,
    unique: true                // Ensure uniqueness for generated IDs
  },
  category: {
    type: String,
    enum: ["Gloves", "Shovel", "Bin", "Truck", "Other"],
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  condition: {
    type: String,
    enum: ["New", "Good", "Damaged", "Needs Repair"],
    default: "Good"
  },
  addedDate: {
    type: Date,
    default: Date.now
  }
});

const Collectingtool = mongoose.model("Collectingtool", collectingToolSchema);

module.exports = Collectingtool;