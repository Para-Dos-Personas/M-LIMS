// src/components/Navbar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import WarehouseSwitcher from './WarehouseSwitcher';

const Navbar = ({ handleDrawerToggle }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:768px)');
  const user = JSON.parse(localStorage.getItem('User'));
  const isAdmin = user?.role === 'Admin';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('User');
    localStorage.removeItem('selectedWarehouseId');
    navigate('/login');
  };

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        {/* Hamburger menu on mobile */}
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          LIMS
        </Typography>

        {/* Warehouse switcher on mobile */}
        {isMobile && (
          <Box mr={2}>
            <WarehouseSwitcher />
          </Box>
        )}

        {/* Desktop nav links */}
        {!isMobile && (
          <Box>
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/inventory">
              Inventory
            </Button>
            <Button color="inherit" component={Link} to="/logs">
              Logs
            </Button>
            {isAdmin && (
              <Button color="inherit" component={Link} to="/users">
                Users
              </Button>
            )}
            <Button color="inherit" component={Link} to="/notifications">
              Notifications
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;