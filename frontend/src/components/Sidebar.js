import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import Divider from '@mui/material/Divider';

import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import LogoutIcon from '@mui/icons-material/Logout';

import NotificationBell from './NotificationBell';
import WarehouseSwitcher from './WarehouseSwitcher';

const Sidebar = ({ handleDrawerToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:768px)');
  const user = JSON.parse(localStorage.getItem('User') || 'null');
  const isAdmin = user?.role === 'Admin';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('User');
    localStorage.removeItem('selectedWarehouseId');
    navigate('/login');
    if (isMobile) handleDrawerToggle();
  };

  const navItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { label: 'Inventory', icon: <InventoryIcon />, path: '/inventory' },
    { label: 'Add Component', icon: <AddIcon />, path: '/add-component' },
    { label: 'Logs', icon: <HistoryIcon />, path: '/logs' },
    ...(isAdmin ? [{ label: 'Users', icon: <PeopleIcon />, path: '/users' }] : []),
    { label: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
    ...(isAdmin
      ? [{ label: 'Warehouses', icon: <WarehouseIcon />, path: '/warehouses' }]
      : []),
  ];

  return (
    <>
      <Box sx={{ p: 3, borderBottom: '1px solid #ce93d8' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Box flex={1} textAlign="center">
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#4a148c' }}>
              LIMS
            </Typography>
            <Typography variant="body2" sx={{ color: '#6a1b9a' }}>
              Inventory Manager
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: '#9c27b0',
              width: 40,
              height: 40,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <NotificationBell />
          </Box>
        </Box>

        {user && (
          <Typography
            variant="caption"
            display="block"
            textAlign="center"
            sx={{ color: '#8e24aa', mb: 2 }}
          >
            Welcome, {user.username}
          </Typography>
        )}

        {!isMobile && (
          <Box textAlign="center">
            <WarehouseSwitcher />
          </Box>
        )}
      </Box>

      <List sx={{ flexGrow: 1, py: 2 }}>
        {navItems.map((item) => {
          const selected = location.pathname.startsWith(item.path);
          return (
            <ListItem
              button
              key={item.label}
              component={Link}
              to={item.path}
              selected={selected}
              onClick={isMobile ? handleDrawerToggle : undefined}
              sx={{
                mx: 1,
                mb: 0.5,
                borderRadius: 2,
                '&.Mui-selected': {
                  backgroundColor: '#ce93d8',
                  color: 'white',
                  '&:hover': { backgroundColor: '#ba68c8' },
                },
                '&:hover': { backgroundColor: '#f3e5f5' },
              }}
            >
              <ListItemIcon sx={{ color: selected ? 'white' : 'inherit', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontWeight: selected ? 'bold' : 'normal',
                  },
                }}
              />
            </ListItem>
          );
        })}
      </List>

      <Divider />

      <Box sx={{ p: 2 }}>
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
    </>
  );
};

export default Sidebar;