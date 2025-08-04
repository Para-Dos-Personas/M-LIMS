import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import authService from '../services/authService';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const { token, user } = await authService.login({ username, password });
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 3, mt: 8 }}>
                <Typography variant="h5" gutterBottom>Login</Typography>
                <TextField
                    fullWidth
                    label="Username"
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <Typography color="error">{error}</Typography>}
                <Box mt={2}>
                    <Button variant="contained" fullWidth onClick={handleLogin}>Login</Button>
                </Box>
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    New user?{' '}
                    <Button
                        size="small"
                        onClick={() => navigate('/register')}
                        sx={{ textTransform: 'none', p: 0, minWidth: 'auto' }}
                    >
                        Register
                    </Button>
                </Typography>
            </Paper>
        </Container>
    );
};

export default Login;
