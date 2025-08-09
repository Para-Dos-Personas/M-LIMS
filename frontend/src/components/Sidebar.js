import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const Sidebar = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('User'));
  const isAdmin = user?.role === 'Admin';

  const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Inventory', path: '/inventory' },
    { label: 'Add Component', path: '/add-component' },
    { label: 'Logs', path: '/logs' },
    ...(isAdmin ? [{ label: 'Users', path: '/users' }] : []),
    { label: 'Notifications', path: '/notifications' },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 250,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 250,
          boxSizing: 'border-box',
          background: 'linear-gradient(135deg, #ede7f6 0%, #d1c4e9 100%)',
        },
      }}
    >
      <Box role="presentation" sx={{ mt: 2 }}>
        <List>
          {navItems.map((item) => (
            <ListItem
              button
              key={item.label}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: '#ce93d8',
                  color: 'white',
                },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default Sidebar;