const mongoose = require("mongoose");

const collectingToolSchema = new mongoose.Schema({
  toolName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Gloves", "Shovel", "Bin", "Truck", "Other"],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  condition: {
    type: String,
    enum: ["New", "Good", "Damaged", "Needs Repair"],
    default: "Good",
  },
  assignedLocation: {
    type: String,
    required: true,
  },
  addedDate: {
    type: Date,
    default: Date.now,
  },
});

const Collectingtool = mongoose.model("Collectingtool", collectingToolSchema);

module.exports = Collectingtool;
