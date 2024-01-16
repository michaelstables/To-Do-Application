const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Register new user
router.post('/register', asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    // Validate request
    if (!username || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // Check if user exists
    const userExists = await User.findOne({ username });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        username,
        password: hashedPassword
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            token: generateToken(user._id) // Implement this function
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
}));

// Login User
router.post('/login', asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    // Check for user email and password match
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            username: user.username,
            token: generateToken(user._id) // Implement this function
        });
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
}));

// Update user password
router.put('/updatepassword', protect, asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (user) {
        // Check if the old password matches
        const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid old password' });
        } else {
            // Hash the new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

            // Update the password
            user.password = hashedPassword;
            await user.save();
            res.json({ message: 'Password updated successfully' });
        }
    } else {
        res.status(404).json({ message: 'User not found' });
    }
}));


// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token expires in 30 days
    });
};

module.exports = router;
