const mongoose = require('mongoose');

// Task schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    dueDate: {
        type: Date
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Reference to the User model
    }
    // Add other fields as needed
});

// Create and export the model
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
