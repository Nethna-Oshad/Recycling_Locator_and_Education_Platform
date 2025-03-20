const express = require("express");
const router = express.Router();
const requestController = require("../controllers/RequestController");

// Define Routes
router.post("/add", requestController.addRequest);
router.get("/", requestController.getAllRequests);
router.get("/:id", requestController.getRequestById);
router.put("/update/:id", requestController.updateRequestStatus);
router.delete("/delete/:id", requestController.deleteRequest);

module.exports = router; // Ensure this line is present
