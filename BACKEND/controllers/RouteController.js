const Route = require('../models/RouteModel'); // Import the Route model

// Create a new route
exports.createRoute = async (req, res) => {
    try {
        // Create a new route instance using request body data
        const newRoute = new Route(req.body);
        await newRoute.save(); // Save the new route to the database

        // Respond with success message and created route data
        res.status(201).json({
            success: true,
            message: "Route created successfully",
            data: newRoute
        });
    } catch (error) {
        // Handle errors during route creation
        res.status(400).json({
            success: false,
            error: "Route creation failed"
        });
    }
};

// Get all routes
exports.getAllRoutes = async (req, res) => {
    try {
        // Fetch all routes from the database
        const routes = await Route.find();
        
        // Respond with retrieved routes
        res.status(200).json({
            success: true,
            data: routes
        });
    } catch (error) {
        // Handle errors during route retrieval
        res.status(500).json({
            success: false,
            error: "Failed to retrieve routes"
        });
    }
};

// Get a route by ID
exports.getRouteById = async (req, res) => {
    try {
        // Find the route by ID provided in the request params
        const route = await Route.findById(req.params.id);
        if (!route) {
            return res.status(404).json({
                success: false,
                error: "Route not found"
            });
        }
        // Respond with the found route
        res.status(200).json({
            success: true,
            data: route
        });
    } catch (error) {
        // Handle errors during fetching of the specific route
        res.status(500).json({
            success: false,
            error: "Failed to fetch route details"
        });
    }
};

// Update a route by ID
exports.updateRoute = async (req, res) => {
    try {
        // Find the route by ID and update it with the new data
        const updatedRoute = await Route.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Return the updated document
        );
        if (!updatedRoute) {
            return res.status(404).json({
                success: false,
                error: "Route not found"
            });
        }
        // Respond with success message and updated route data
        res.status(200).json({
            success: true,
            message: "Route updated successfully",
            data: updatedRoute
        });
    } catch (error) {
        // Handle errors during route update
        res.status(400).json({
            success: false,
            error: "Update failed"
        });
    }
};

// Delete a route by ID
exports.deleteRoute = async (req, res) => {
    try {
        // Find the route by ID and delete it from the database
        const deletedRoute = await Route.findByIdAndDelete(req.params.id);
        if (!deletedRoute) {
            return res.status(404).json({
                success: false,
                error: "Route not found"
            });
        }
        // Respond with success message after deletion
        res.status(200).json({
            success: true,
            message: "Route deleted successfully"
        });
    } catch (error) {
        // Handle errors during route deletion
        res.status(500).json({
            success: false,
            error: "Failed to delete route"
        });
    }
};
