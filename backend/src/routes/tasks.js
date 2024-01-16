// server/src/routes/tasks.js

const express = require('express');
const asyncHandler = require('express-async-handler');
const { protect } = require('../middleware/auth');
const Task = require('../models/Task');
const router = express.Router();

// Create a new task
router.post('/', protect, asyncHandler(async (req, res) => {
    const { title, description, dueDate } = req.body;

    const task = await Task.create({
        title,
        description,
        dueDate,
        user: req.user.id, // Associating the task with the user
    });

    if (task) {
        res.status(201).json(task);
    } else {
        res.status(400);
        throw new Error('Invalid task data');
    }
}));

// Retrieve all tasks for a user
router.get('/', protect, asyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
}));

// Update a task
router.put('/:id', protect, asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (task && task.user.toString() === req.user.id) {
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.dueDate = req.body.dueDate || task.dueDate;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } else {
        res.status(404);
        throw new Error('Task not found or user not authorized');
    }
}));

// Delete a task
router.delete('/:id', protect, asyncHandler(async (req, res) => {
    console.log(`Attempting to delete task with id: ${req.params.id}`);

    try {
        const task = await Task.findById(req.params.id);
        console.log(`Task found: ${task}`);

        if (task && task.user.toString() === req.user.id) {
            await Task.findByIdAndDelete(req.params.id);
            console.log(`Task removed: ${req.params.id}`);
            res.json({ message: 'Task removed' });
        } else {
            console.log(`Task not found or user not authorized: ${req.params.id}`);
            res.status(404).json({ message: 'Task not found or user not authorized' });
        }
    } catch (error) {
        console.error(`Error removing task: ${error}`);
        res.status(500).json({ message: 'Error removing task', error: error.message });
    }
}));

module.exports = router;
