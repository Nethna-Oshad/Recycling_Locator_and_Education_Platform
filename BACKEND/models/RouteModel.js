const mongoose = require('mongoose'); // Import mongoose for database operations

const routeSchema = new mongoose.Schema({
    routeName: { 
        type: String,  // Store the route name
        required: true, 
        trim: true 
    },
    startLocation: { 
        type: String, // Store the start location
        required: true 
    },
    endLocation: { 
        type: String, // Store the end location
        required: true 
    },
    vehicleType: { 
        type: String, // Store vehicle type
        enum: ['MiniTruck', 'Truck'], // Only allow MiniTruck or Truck
        required: true 
    },
    collectingDays: [{ 
        type: String, // Array of collection days
        enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    }],
    collectionDate: { 
        type: Date, // Store collection date
        required: true 
    },
    routeDescription: { 
        type: String, // Additional route details
        trim: true 
    },
    status: { 
        type: Boolean, // Active or inactive status
        default: true 
    }
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

module.exports = mongoose.model('Route', routeSchema); // Export the model
