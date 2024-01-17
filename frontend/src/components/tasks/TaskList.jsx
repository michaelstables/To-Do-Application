import React, { useState, useEffect } from 'react';
import Task from './Task';
import AddTaskForm from './AddTaskForm';
import EditTaskForm from './EditTaskForm';
import { Button, Box, Typography, useTheme } from '@mui/material';
import {API_URL} from "../../utils/config.js";

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [showAddTask, setShowAddTask] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const theme = useTheme();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`${API_URL}/api/tasks`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const handleDeleteTask = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Error deleting task');
                }

                setTasks(tasks.filter(task => task._id !== taskId));
            } catch (error) {
                console.error('Failed to delete the task:', error);
            }
        }
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
    };

    const handleTaskUpdate = async (updatedTask) => {
        try {
            const response = await fetch(`${API_URL}/api/tasks/${updatedTask._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(updatedTask),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Error updating task');
            }

            setTasks(tasks.map(task => task._id === updatedTask._id ? data : task));
            setEditingTask(null);
        } catch (error) {
            console.error('Failed to update the task:', error);
        }
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Your Tasks</Typography>
            <Button
                onClick={() => setShowAddTask(!showAddTask)}
                variant="contained"
                sx={{ mb: 2, bgcolor: theme.palette.primary.main }}
            >
                {showAddTask ? 'Hide Add Task' : 'Show Add Task'}
            </Button>

            {showAddTask && <AddTaskForm setTasks={setTasks} />}
            {editingTask && (
                <EditTaskForm
                    task={editingTask}
                    onEdit={handleTaskUpdate}
                    onClose={() => setEditingTask(null)}
                />
            )}

            {tasks.map(task => (
                <Task
                    key={task._id}
                    task={task}
                    onDelete={handleDeleteTask}
                    onEdit={handleEditTask}
                />
            ))}
        </Box>
    );
}

export default TaskList;
