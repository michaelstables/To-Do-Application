// src/theme.js
import { createTheme } from '@mui/material/styles';
import { deepPurple, amber, grey } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: deepPurple,
        secondary: amber,
        background: {
            default: 'linear-gradient(45deg, #303030 30%, #424242 90%)', // Sleek gradient
            paper: grey[800],
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            color: amber[500],
        },
        // ... other typography styles
    },
    components: {
        // ... component styles
    },
});

export default theme;
