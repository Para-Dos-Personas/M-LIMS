import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import SidebarContent from './Sidebar';
import Navbar from './Navbar'; // 1. Import your custom Navbar

const drawerWidth = 250;

const Main = styled('main')(({ theme, isMobile }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: isMobile ? 0 : `${drawerWidth}px`, // Corrected marginLeft for permanent drawer
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
}));

const ProtectedLayout = () => {
    const isMobile = useMediaQuery('(max-width:768px)');
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            {/* 2. Use your custom Navbar for the mobile header */}
            {isMobile && <Navbar handleDrawerToggle={handleDrawerToggle} />}

            <MuiDrawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant={isMobile ? "temporary" : "permanent"}
                anchor="left"
                open={isMobile ? drawerOpen : true}
                onClose={handleDrawerToggle}
            >
                {/* Pass the toggle handler to SidebarContent */}
                <SidebarContent handleDrawerToggle={handleDrawerToggle} />
            </MuiDrawer>

            <Main isMobile={isMobile}>
                {/* This Toolbar adds spacing to push content below the fixed mobile navbar */}
                {isMobile && <Toolbar />}
                <Outlet />
            </Main>
        </Box>
    );
};

export default ProtectedLayout;
