const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: [true, "Please add full name"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    username: {
        type: String,
        required: [true, "Please add a username"],
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["Resident", "Manager", "Admin"], // ✅ Removed space
        required: true,
        default: "Resident",
    },
    
    Id: {
        type: String,
        required: true,
        unique: true,
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;