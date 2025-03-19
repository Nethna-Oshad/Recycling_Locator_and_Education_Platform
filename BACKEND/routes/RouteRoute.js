const express = require('express');
const router = express.Router();
const routeController = require('../controllers/RouteController');

// Routes for managing garbage collection routes
router.post('/add', routeController.createRoute); // Create a new route
router.get('/', routeController.getAllRoutes); // Get all routes
router.get('/:id', routeController.getRouteById); // Get a single route by ID
router.put('/update/:id', routeController.updateRoute); // Update a route by ID
router.delete('/delete/:id', routeController.deleteRoute); // Delete a route by ID

module.exports = router;
