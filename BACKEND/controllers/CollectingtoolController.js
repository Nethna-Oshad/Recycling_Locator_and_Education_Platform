const Collectingtool = require("../models/CollectingtoolModel");

// Add a new collecting tool
exports.addCollectingtool = async (req, res) => {
  try {
    const newTool = new Collectingtool(req.body);
    await newTool.save();
    res.status(201).json({ message: "Collecting tool added successfully", tool: newTool });
  } catch (err) {
    res.status(500).json({ message: "Error adding collecting tool", error: err.message });
  }
};

// Get all collecting tools
exports.getAllCollectingtools = async (req, res) => {
  try {
    const tools = await Collectingtool.find();
    res.status(200).json({ tools });
  } catch (err) {
    res.status(500).json({ message: "Error fetching collecting tools", error: err.message });
  }
};

// Get a collecting tool by ID
exports.getCollectingtoolById = async (req, res) => {
  try {
    const tool = await Collectingtool.findById(req.params.id);
    if (!tool) {
      return res.status(404).json({ message: "Collecting tool not found" });
    }
    res.status(200).json({ tool });
  } catch (err) {
    res.status(500).json({ message: "Error fetching collecting tool", error: err.message });
  }
};

// Update a collecting tool by ID
exports.updateCollectingtool = async (req, res) => {
  try {
    const updatedTool = await Collectingtool.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTool) {
      return res.status(404).json({ message: "Collecting tool not found" });
    }
    res.status(200).json({ message: "Collecting tool updated successfully", tool: updatedTool });
  } catch (err) {
    res.status(500).json({ message: "Error updating collecting tool", error: err.message });
  }
};

// Delete a collecting tool by ID
exports.deleteCollectingtool = async (req, res) => {
  try {
    const deletedTool = await Collectingtool.findByIdAndDelete(req.params.id);
    if (!deletedTool) {
      return res.status(404).json({ message: "Collecting tool not found" });
    }
    res.status(200).json({ message: "Collecting tool deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting collecting tool", error: err.message });
  }
};
