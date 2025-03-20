require("dotenv").config();
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const expressAsyncHandler = require('express-async-handler');
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET||"wastecollection"
console.log("JWT_SECRET:", JWT_SECRET);


const generateToken = (Id, role) => {
    return jwt.sign({ Id, role }, JWT_SECRET, { expiresIn: "10h" });
};

const residentRegister = expressAsyncHandler(async (req, res) => {
    try {
        const { fullname, contactNumber, address, username, email, password } = req.body;

        if ( !fullname || !contactNumber || !address || !username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

    
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }

        // Validate contact number format
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(contactNumber)) {
            return res.status(400).json({ error: "Invalid contact number" });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Check if username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // Generate Unique Resident ID
        let Id;
        let newId;
        do {
            const randomNum = Math.floor(1000 + Math.random() * 9000);
            newId = "RU" + randomNum.toString();
        } while (await User.findOne({Id: newId }));

        Id = newId;

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new resident user
        const newResident = new User({
            fullname,
            email,
            username,
            password: hashedPassword,
            address,
            contactNumber,
            role:"Resident", // Capitalized to match enum
            Id,
        });

        await newResident.save();

        res.status(201).json({
            id: newResident.Id,
            fullname: newResident.fullname,
            contactNumber: newResident.contactNumber,
            username: newResident.username,
            email: newResident.email,
            address: newResident.address,
            role: newResident.role,
            token: generateToken(newResident._id, newResident.role), // ✅ Fixed Id usage
            message: "Resident registered successfully",
        });
        

    } catch (error) {
        console.error("Registration Error:", error.message); // ✅ Log full error
        res.status(500).json({error: error.message || "Failed to register resident" });
    }
});

module.exports = { residentRegister };