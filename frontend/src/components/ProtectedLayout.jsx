// src/components/ProtectedLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Box } from '@mui/material';

const ProtectedLayout = () => (
    <>
        <Navbar />
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                }}
            >
                <Outlet />
            </Box>
        </Box>
    </>
);

export default ProtectedLayout;