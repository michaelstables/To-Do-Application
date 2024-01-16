import React, { useState } from 'react';
import { TextField, Button, Box, useTheme } from '@mui/material';

function EditTaskForm({ task, onEdit, onClose }) {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const theme = useTheme();

    const handleSubmit = (e) => {
        e.preventDefault();
        onEdit({ ...task, title, description });
        onClose();
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
            <Button type="submit" variant="contained" sx={{ mt: 2, mr: 2, bgcolor: theme.palette.primary.main }}>
                Save Changes
            </Button>
            <Button variant="outlined" onClick={onClose} sx={{ mt: 2 }}>
                Cancel
            </Button>
        </Box>
    );
}

export default EditTaskForm;
