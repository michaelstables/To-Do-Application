import React, { useState } from 'react';
import { TextField, Button, Box, useTheme } from '@mui/material';
import {API_URL} from "../utils/config.js";

function Profile() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const theme = useTheme();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            alert('New passwords do not match');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/users/updatepassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ oldPassword, newPassword })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to update password');
            }

            alert('Password updated successfully');
            // Reset form or redirect as needed
        } catch (error) {
            console.error('Error updating password:', error);
            alert(error.message);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: theme.spacing(4), maxWidth: 400, mx: 'auto' }}>
            <TextField
                label="Old Password"
                type="password"
                fullWidth
                margin="normal"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
            />
            <TextField
                label="New Password"
                type="password"
                fullWidth
                margin="normal"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            />
            <TextField
                label="Confirm New Password"
                type="password"
                fullWidth
                margin="normal"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
            />
            <Button type="submit" variant="contained" sx={{ mt: 2, bgcolor: theme.palette.primary.main }}>
                Update Password
            </Button>
        </Box>
    );
}

export default Profile;
