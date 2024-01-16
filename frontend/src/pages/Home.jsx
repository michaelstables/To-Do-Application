// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Button, useTheme, Box } from '@mui/material';
import logo from '../assets/images/todo_logo.jpg'; // Adjust the path to your logo image as necessary

function Home() {
    const theme = useTheme();
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');

    const navigateToLogin = () => {
        navigate('/login');
    };

    const navigateToRegister = () => {
        navigate('/register');
    };

    const navigateToTasks = () => {
        navigate('/tasks');
    };

    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: theme.spacing(4), mb: theme.spacing(4) }}>
            <Typography variant="h2" component="h1" gutterBottom color={theme.palette.primary.main}>
                Welcome to the To-Do List App
            </Typography>
            <Box
                component="img"
                src={logo}
                alt="To-Do List Logo"
                sx={{ width: 300, height: 300, borderRadius: '50%', mt: theme.spacing(2), mb: theme.spacing(2) }}
            />
            <Typography variant="subtitle1" color="text.secondary">
                Manage your tasks efficiently and easily.
            </Typography>
            {!isAuthenticated ? (
                <Box>
                    <Button variant="contained" onClick={navigateToLogin} sx={{ mt: theme.spacing(2), mr: theme.spacing(1), bgcolor: 'purple' }}>
                        Login
                    </Button>
                    <Button variant="contained" onClick={navigateToRegister} sx={{ mt: theme.spacing(2), bgcolor: 'purple' }}>
                        Register
                    </Button>
                </Box>
            ) : (
                <Button variant="contained" onClick={navigateToTasks} sx={{ mt: theme.spacing(2), bgcolor: 'purple' }}>
                    Go to Task List
                </Button>
            )}
        </Container>
    );
}

export default Home;
