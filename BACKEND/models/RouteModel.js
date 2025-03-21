// models/RouteModel.js
const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  routeName: {
    type: String,
    required: true,
    trim: true
  },
  startLocation: {
    type: String,
    required: true
  },
  endLocation: {
    type: String,
    required: true
  },
  vehicleType: {
    type: String,
    enum: ['MiniTruck', 'Truck'],
    required: true
  },
  collectingDays: [{
    type: String,
    enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  }],
  collectingTime: { // Changed from collectionDate to collectingTime
    type: String, // e.g., "14:30"
    required: true
  },
  routeDescription: {
    type: String,
    trim: true
  },
  status: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Route', routeSchema);