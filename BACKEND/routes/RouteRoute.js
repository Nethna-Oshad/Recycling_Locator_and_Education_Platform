// routes/routeRoutes.js (note the 's' and consistent naming)
const express = require("express");
const router = express.Router();
const routeController = require("../controllers/RouteController");

// Routes for managing garbage collection routes
router.post("/add", routeController.addRoute);
router.get("/", routeController.getAllRoutes);
router.get("/:id", routeController.getRouteById);
router.put("/update/:id", routeController.updateRoute);
router.delete("/delete/:id", routeController.deleteRoute);

module.exports = router;