import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.role === 'admin';

  const toggleDrawer = (state) => () => setOpen(state);

  const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Inventory', path: '/inventory' },
    { label: 'Logs', path: '/logs' },
    ...(isAdmin ? [{ label: 'Users', path: '/users' }] : []),
    { label: 'Notifications', path: '/notifications' },
  ];

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ position: 'fixed', top: 10, left: 10, zIndex: 1201 }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {navItems.map((item) => (
              <ListItem
                button
                key={item.label}
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;