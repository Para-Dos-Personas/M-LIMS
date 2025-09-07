import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';

import SidebarContent from './Sidebar';
import Navbar from './Navbar';

const drawerWidth = 250;

// Prevent the `isMobile` prop from being passed to the DOM
const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'isMobile',
})(({ theme, isMobile }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: isMobile ? 0 : `${drawerWidth}px`,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

export default function ProtectedLayout() {
  const isMobile = useMediaQuery('(max-width:768px)');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((open) => !open);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {isMobile && <Navbar handleDrawerToggle={handleDrawerToggle} />}

      <MuiDrawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? drawerOpen : true}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <SidebarContent handleDrawerToggle={handleDrawerToggle} />
      </MuiDrawer>

      <Main isMobile={isMobile}>
        {isMobile && <Toolbar />}
        <Outlet />
      </Main>
    </Box>
  );
}