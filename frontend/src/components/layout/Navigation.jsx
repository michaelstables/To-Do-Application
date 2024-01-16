import React from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, useTheme } from '@mui/material';

function Navigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token;
    const theme = useTheme(); // Use the theme

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const isHomePage = location.pathname === '/';

    return (
        <AppBar position="static" sx={{ mb: 4, bgcolor: theme.palette.background.paper }}>
            <Toolbar>
                {!isHomePage && (
                    <Button component={RouterLink} to="/" sx={{ color: theme.palette.primary.contrastText }}>
                        Home
                    </Button>
                )}
                {isAuthenticated ? (
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button component={RouterLink} to="/profile" sx={{ color: theme.palette.primary.contrastText }}>
                            Profile
                        </Button>
                        <Button onClick={handleLogout} sx={{ color: theme.palette.primary.contrastText }}>
                            Logout
                        </Button>
                    </Box>
                ) : (
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button component={RouterLink} to="/login" sx={{ color: theme.palette.primary.contrastText }}>
                            Login
                        </Button>
                        <Button component={RouterLink} to="/register" sx={{ color: theme.palette.primary.contrastText }}>
                            Register
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navigation;
