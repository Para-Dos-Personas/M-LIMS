import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('User'));
  const isAdmin = user?.role === 'Admin';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('User');
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { label: 'Inventory', path: '/inventory', icon: <InventoryIcon /> },
    { label: 'Add Component', path: '/add-component', icon: <AddIcon /> },
    { label: 'Logs', path: '/logs', icon: <HistoryIcon /> },
    ...(isAdmin ? [{ label: 'Users', path: '/users', icon: <PeopleIcon /> }] : []),
    { label: 'Notifications', path: '/notifications', icon: <NotificationsIcon /> },
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
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid #ce93d8',
        },
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, textAlign: 'center', borderBottom: '1px solid #ce93d8' }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#4a148c' }}>
          LIMS
        </Typography>
        <Typography variant="body2" sx={{ color: '#6a1b9a', mt: 1 }}>
          Inventory Manager
        </Typography>
        {user && (
          <Typography variant="caption" sx={{ color: '#8e24aa', display: 'block', mt: 1 }}>
            Welcome, {user.username}
          </Typography>
        )}
      </Box>

      {/* Navigation Items */}
      <Box role="presentation" sx={{ flexGrow: 1, py: 2 }}>
        <List>
          {navItems.map((item) => (
            <ListItem
              button
              key={item.label}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                mx: 1,
                mb: 0.5,
                borderRadius: 2,
                '&.Mui-selected': {
                  backgroundColor: '#ce93d8',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#ba68c8',
                  },
                },
                '&:hover': {
                  backgroundColor: '#f3e5f5',
                },
              }}
            >
              <ListItemIcon sx={{ 
                color: location.pathname === item.path ? 'white' : 'inherit',
                minWidth: 40 
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label} 
                sx={{
                  '& .MuiListItemText-primary': {
                    fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                  }
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Logout Button */}
      <Box sx={{ p: 2, borderTop: '1px solid #ce93d8' }}>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            borderColor: '#d32f2f',
            color: '#d32f2f',
            borderRadius: 2,
            py: 1.5,
            '&:hover': {
              borderColor: '#b71c1c',
              backgroundColor: '#ffebee',
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;