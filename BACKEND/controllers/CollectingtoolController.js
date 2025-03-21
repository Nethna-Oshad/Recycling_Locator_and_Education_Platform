// controllers/CollectingtoolController.js
const Collectingtool = require("../models/CollectingtoolModel");

// Helper function to generate itemNo based on category and latest number
const generateItemNo = async (category, quantity) => {
  const prefixMap = {
    "Gloves": "G",
    "Shovel": "S",
    "Bin": "B",
    "Truck": "T",
    "Other": "O"
  };
  const prefix = prefixMap[category] || "O"; // Default to "O" if category is invalid

  // Find the highest existing number for this category
  const regex = new RegExp(`^${prefix}\\d{4}$`);
  const latestTool = await Collectingtool.findOne({ itemNo: regex })
    .sort({ itemNo: -1 })
    .exec();

  let lastNumber = 2000; // Starting number (e.g., G2001)
  if (latestTool) {
    const numberPart = parseInt(latestTool.itemNo.slice(1)); // Extract number after prefix
    lastNumber = numberPart;
  }

  const itemNos = [];
  for (let i = 1; i <= quantity; i++) {
    const newNumber = lastNumber + i;
    itemNos.push(`${prefix}${newNumber.toString().padStart(4, '0')}`); // e.g., B7001
  }
  return itemNos;
};

// Add a new collecting tool (generates multiple if quantity > 1)
exports.addCollectingtool = async (req, res) => {
  try {
    const { category, quantity, condition } = req.body;

    // Validate input
    if (!category || !quantity) {
      return res.status(400).json({ message: "Category and quantity are required" });
    }

    // Generate itemNos based on quantity
    const itemNos = await generateItemNo(category, quantity);
    const tools = [];

    // Create a document for each itemNo
    for (const itemNo of itemNos) {
      const newTool = new Collectingtool({
        itemNo,
        category,
        quantity: 1, // Each document represents one item
        condition: condition || "Good"
      });
      await newTool.save();
      tools.push(newTool);
    }

    res.status(201).json({ message: "Collecting tools added successfully", tools });
  } catch (err) {
    res.status(500).json({ message: "Error adding collecting tools", error: err.message });
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
    const { itemNo, category, condition } = req.body; // Quantity is now per item, not editable here
    const updatedTool = await Collectingtool.findByIdAndUpdate(
      req.params.id,
      { itemNo, category, condition, quantity: 1 }, // Ensure quantity remains 1 per item
      { new: true, runValidators: true }
    );
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