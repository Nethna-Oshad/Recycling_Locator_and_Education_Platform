// routes/CollectingtoolRoute.js
const express = require("express");
const router = express.Router();
const collectingtoolController = require("../controllers/CollectingtoolController");

// Create new collecting tool(s)
router.post("/add", collectingtoolController.addCollectingtool);

// Get all collecting tools
router.get("/", collectingtoolController.getAllCollectingtools);

// Get a single collecting tool by ID
router.get("/:id", collectingtoolController.getCollectingtoolById);

// Update a collecting tool by ID
router.put("/update/:id", collectingtoolController.updateCollectingtool);

// Delete a collecting tool by ID
router.delete("/delete/:id", collectingtoolController.deleteCollectingtool);

module.exports = router;