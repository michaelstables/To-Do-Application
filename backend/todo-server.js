const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const userRoutes = require('./src/routes/users'); // Ensure the path is correct
const taskRoutes = require('./src/routes/tasks');
require('dotenv').config();

const app = express();

// Use express.json() to parse JSON payloads
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// MongoDB URI from config.js file
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// User routes
app.use('/api/users', userRoutes);

// Task routes
app.use('/api/tasks', taskRoutes);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Catch-all route for SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define a port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Error Handling Middleware (optional, but recommended)
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
});
