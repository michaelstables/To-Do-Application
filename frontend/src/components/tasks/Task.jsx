import React from 'react';
import { Card, CardContent, Typography, Button, Box, useTheme } from '@mui/material';

function Task({ task, onDelete, onEdit }) {
    const theme = useTheme();

    return (
        <Card variant="outlined" sx={{ mb: 2, bgcolor: theme.palette.background.paper }}>
            <CardContent>
                <Typography variant="h5" component="div" color={theme.palette.primary.light}>
                    {task.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {task.description}
                </Typography>
                <Box>
                    <Button
                        size="small"
                        onClick={() => onEdit(task)}
                        sx={{
                            mr: 1,
                            bgcolor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            '&:hover': {
                                bgcolor: theme.palette.primary.dark,
                            }
                        }}>
                        Edit
                    </Button>
                    <Button
                        size="small"
                        onClick={() => onDelete(task._id)}
                        sx={{
                            bgcolor: theme.palette.error.main,
                            color: theme.palette.error.contrastText,
                            '&:hover': {
                                bgcolor: theme.palette.error.dark,
                            }
                        }}>
                        Delete
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export default Task;
