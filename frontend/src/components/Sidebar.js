import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import NotificationBell from './NotificationBell';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles';

const Sidebar = ({ handleDrawerToggle }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:768px)');
    const user = JSON.parse(localStorage.getItem('User'));
    const isAdmin = user?.role === 'Admin';

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('User');
        navigate('/login');
        if (isMobile) {
            handleDrawerToggle();
        }
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
        <>
            <Box sx={{ p: 3, borderBottom: '1px solid #ce93d8' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Box textAlign="center" flex={1}>
                        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#4a148c' }}>
                            LIMS
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#6a1b9a' }}>
                            Inventory Manager
                        </Typography>
                    </Box>
                    <Box sx={{
                        bgcolor: '#9c27b0',
                        borderRadius: '50%',
                        width: 40,
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <NotificationBell />
                    </Box>
                </Box>
                {user && (
                    <Typography variant="caption" sx={{ color: '#8e24aa', display: 'block', textAlign: 'center' }}>
                        Welcome, {user.username}
                    </Typography>
                )}
            </Box>
            <Box role="presentation" sx={{ flexGrow: 1, py: 2 }}>
                <List>
                    {navItems.map((item) => (
                        <ListItem
                            button
                            key={item.label}
                            component={Link}
                            to={item.path}
                            selected={location.pathname === item.path}
                            onClick={isMobile ? handleDrawerToggle : null}
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
        </>
    );
};

export default Sidebar;