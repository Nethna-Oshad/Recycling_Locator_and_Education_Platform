// controllers/RouteController.js
const Route = require("../models/RouteModel");

// Add a new route
exports.addRoute = async (req, res) => {
  try {
    const { routeName, startLocation, endLocation, vehicleType, collectingDays, collectingTime, routeDescription, status } = req.body;

    if (!routeName || !startLocation || !endLocation || !vehicleType || !collectingTime) {
      return res.status(400).json({ message: "Route name, start location, end location, vehicle type, and collecting time are required" });
    }

    const newRoute = new Route({
      routeName,
      startLocation,
      endLocation,
      vehicleType,
      collectingDays: collectingDays || [],
      collectingTime,
      routeDescription: routeDescription || "",
      status: status !== undefined ? status : true
    });

    await newRoute.save();
    res.status(201).json({ message: "Route added successfully", route: newRoute });
  } catch (err) {
    res.status(500).json({ message: "Error adding route", error: err.message });
  }
};

// Get all routes
exports.getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.status(200).json({ message: "Routes fetched successfully", routes });
  } catch (err) {
    res.status(500).json({ message: "Error fetching routes", error: err.message });
  }
};

// Get a route by ID
exports.getRouteById = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }
    res.status(200).json({ message: "Route fetched successfully", route });
  } catch (err) {
    res.status(500).json({ message: "Error fetching route", error: err.message });
  }
};

// Update a route by ID
exports.updateRoute = async (req, res) => {
  try {
    const { routeName, startLocation, endLocation, vehicleType, collectingDays, collectingTime, routeDescription, status } = req.body;

    if (!routeName || !startLocation || !endLocation || !vehicleType || !collectingTime) {
      return res.status(400).json({ message: "Route name, start location, end location, vehicle type, and collecting time are required" });
    }

    const updatedRoute = await Route.findByIdAndUpdate(
      req.params.id,
      {
        routeName,
        startLocation,
        endLocation,
        vehicleType,
        collectingDays: collectingDays || [],
        collectingTime,
        routeDescription: routeDescription || "",
        status: status !== undefined ? status : true
      },
      { new: true, runValidators: true }
    );

    if (!updatedRoute) {
      return res.status(404).json({ message: "Route not found" });
    }
    res.status(200).json({ message: "Route updated successfully", route: updatedRoute });
  } catch (err) {
    res.status(500).json({ message: "Error updating route", error: err.message });
  }
};

// Delete a route by ID
exports.deleteRoute = async (req, res) => {
  try {
    const deletedRoute = await Route.findByIdAndDelete(req.params.id);
    if (!deletedRoute) {
      return res.status(404).json({ message: "Route not found" });
    }
    res.status(200).json({ message: "Route deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting route", error: err.message });
  }
};