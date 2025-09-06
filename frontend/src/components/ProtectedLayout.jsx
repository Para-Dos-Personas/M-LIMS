import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SidebarContent from './Sidebar';

const drawerWidth = 250;

const Main = styled('main')(({ theme, isMobile }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: isMobile ? 0 : `${drawerWidth-270}px`,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
}));

const ProtectedLayout = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:768px)');
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('User');
        navigate('/login');
        if (isMobile) {
            setDrawerOpen(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <MuiAppBar
                position="fixed"
                sx={{
                    display: isMobile ? 'block' : 'none', // Only show on mobile
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                        LIMS
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </MuiAppBar>

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
                {isMobile && <Toolbar />}
                <SidebarContent />
            </MuiDrawer>

            <Main isMobile={isMobile}>
                {isMobile && <Toolbar />}
                <Outlet />
            </Main>
        </Box>
    );
};

export default ProtectedLayout;