// WastestockController.js

const WasteInventory = require('../models/WastestockModel');

// Add new waste stock item
exports.addWasteStock = async (req, res) => {
    try {
        const { stockID, itemName, itemCategory, quantity, status, comments } = req.body;
        const newWasteStock = new WasteInventory({ stockID, itemName, itemCategory, quantity, status, comments });
        await newWasteStock.save();
        res.status(201).json({ message: "Waste stock added successfully", data: newWasteStock });
    } catch (error) {
        res.status(500).json({ message: "Error adding waste stock", error });
    }
};

// Get all waste stock items
exports.getAllWasteStock = async (req, res) => {
    try {
        const wasteStock = await WasteInventory.find();
        res.status(200).json(wasteStock);
    } catch (error) {
        res.status(500).json({ message: "Error fetching waste stock", error });
    }
};

// Get waste stock item by ID
exports.getWasteStockById = async (req, res) => {
    try {
        const wasteStock = await WasteInventory.findOne({ stockID: req.params.id });
        if (!wasteStock) {
            return res.status(404).json({ message: "Waste stock not found" });
        }
        res.status(200).json(wasteStock);
    } catch (error) {
        res.status(500).json({ message: "Error fetching waste stock", error });
    }
};

// Update waste stock item
exports.updateWasteStock = async (req, res) => {
    try {
        const updatedWasteStock = await WasteInventory.findOneAndUpdate(
            { stockID: req.params.id },
            req.body,
            { new: true }
        );
        if (!updatedWasteStock) {
            return res.status(404).json({ message: "Waste stock not found" });
        }
        res.status(200).json({ message: "Waste stock updated successfully", data: updatedWasteStock });
    } catch (error) {
        res.status(500).json({ message: "Error updating waste stock", error });
    }
};

// Delete waste stock item
exports.deleteWasteStock = async (req, res) => {
    try {
        const deletedWasteStock = await WasteInventory.findOneAndDelete({ stockID: req.params.id });
        if (!deletedWasteStock) {
            return res.status(404).json({ message: "Waste stock not found" });
        }
        res.status(200).json({ message: "Waste stock deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting waste stock", error });
    }
};
