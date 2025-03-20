const express = require('express');
const router = express.Router();
const {residentRegister}  = require('../controllers/UserController');

router.post("/register", residentRegister);

module.exports = router;