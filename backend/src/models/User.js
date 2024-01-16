const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: { // Store hashed passwords, never store plain text passwords
        type: String,
        required: true
    },
    // Add other fields as needed
});

// Create and export the model
const User = mongoose.model('User', userSchema);
module.exports = User;
