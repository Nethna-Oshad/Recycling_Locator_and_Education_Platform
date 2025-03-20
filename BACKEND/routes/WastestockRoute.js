// WastestockRoute.js

const express = require('express');
const wastestock = express.Router();  // Changed 'router' to 'wastestock'
const WastestockController = require('../controllers/WastestockController');

// Routes for waste inventory
wastestock.post('/add', WastestockController.addWasteStock);
wastestock.get('/all', WastestockController.getAllWasteStock);
wastestock.get('/:id', WastestockController.getWasteStockById);
wastestock.put('/update/:id', WastestockController.updateWasteStock);
wastestock.delete('/delete/:id', WastestockController.deleteWasteStock);

module.exports = wastestock;  // Exporting as 'wastestock'
