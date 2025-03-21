// controllers/RequestController.js
const Request = require("../models/RequestModel");

// Add a new emergency request
exports.addRequest = async (req, res) => {
  try {
    const { fullName, emergencyRequestType, description } = req.body;
    
    const newRequest = new Request({
      fullName,
      emergencyRequestType,
      description,
    });

    await newRequest.save();
    res.status(201).json({ message: "Emergency request added successfully", request: newRequest });
  } catch (err) {
    res.status(500).json({ message: "Error adding request", error: err.message });
  }
};

// Get all emergency requests
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json({ requests });
  } catch (err) {
    res.status(500).json({ message: "Error fetching requests", error: err.message });
  }
};

// Get an emergency request by ID
exports.getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json({ request });
  } catch (err) {
    res.status(500).json({ message: "Error fetching request", error: err.message });
  }
};

// Update request (allow all fields, not just status)
exports.updateRequestStatus = async (req, res) => {
  try {
    const { fullName, emergencyRequestType, description, requestStatus } = req.body;

    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      { fullName, emergencyRequestType, description, requestStatus },
      { new: true, runValidators: true } // Return updated doc and validate
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({ message: "Request updated successfully", request: updatedRequest });
  } catch (err) {
    res.status(500).json({ message: "Error updating request", error: err.message });
  }
};

// Delete an emergency request
exports.deleteRequest = async (req, res) => {
  try {
    const deletedRequest = await Request.findByIdAndDelete(req.params.id);
    if (!deletedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json({ message: "Request deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting request", error: err.message });
  }
};