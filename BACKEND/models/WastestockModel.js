// wasteInventoryModel.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the waste inventory
const wasteInventorySchema = new Schema({
  stockID: {
    type: String,
    required: true,
    unique: true
  },
  itemName: {
    type: String,
    required: true,
  },
  itemCategory: {
    type: String,
    enum: ['Organic', 'Inorganic', 'Other'], // Adjust as needed
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['Pending', 'Processed', 'Disposed'], // Adjust as needed
    default: 'Pending',
  },
  comments: {
    type: String,
    required: false,
  }
});

// Create the model for waste inventory
const WasteInventory = mongoose.model('WasteInventory', wasteInventorySchema);

module.exports = WasteInventory;
