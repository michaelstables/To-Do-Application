import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, CircularProgress, Typography, Box, useTheme } from '@mui/material';
import { API_URL } from "../../utils/config.js";

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme(); // Ensure useTheme is used here

    const loginUser = async (credentials) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Error logging in');
            }

            localStorage.setItem('token', data.token);
            setIsLoading(false);
            navigate('/tasks');
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message);
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!username || !password) {
            setError('Username and password are required');
            return;
        }
        loginUser({ username, password });
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
            <Typography variant="h4" sx={{ mb: 2, color: theme.palette.secondary.main }}>
                Login
            </Typography>
            {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2, mb: 2 }}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress size={24} /> : 'Login'}
                </Button>
            </form>
        </Box>
    );
}

export default LoginForm;
