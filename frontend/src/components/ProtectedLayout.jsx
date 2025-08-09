// src/components/ProtectedLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Box } from '@mui/material';

const ProtectedLayout = () => (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                p: 4,
                backgroundColor: '#fafafa',
                minHeight: '100vh',
                overflow: 'auto',
            }}
        >
            <Outlet />
        </Box>
    </Box>
);

export default ProtectedLayout;