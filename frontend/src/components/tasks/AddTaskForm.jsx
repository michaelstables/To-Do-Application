import React, { useState } from 'react';
import { TextField, Button, Box, useTheme } from '@mui/material';

function AddTaskForm({ setTasks }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const theme = useTheme(); // Use the theme

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ title, description }),
            });

            const newTask = await response.json();
            if (!response.ok) {
                throw new Error(newTask.message || 'Error creating task');
            }

            setTasks(prevTasks => [...prevTasks, newTask]);
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
                label="Title"
                fullWidth
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 2, bgcolor: theme.palette.primary.main }}
            >
                Add Task
            </Button>
        </Box>
    );
}

export default AddTaskForm;
