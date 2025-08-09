import React, { useState } from 'react';
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
  Button,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  NotificationsOutlined as NotificationIcon,
  NotificationsNone as NotificationOffIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Error as ErrorIcon,
  CheckCircle as CheckCircleIcon,
  Inventory as InventoryIcon,
  History as HistoryIcon
} from '@mui/icons-material';
import { useNotifications } from '../contexts/NotificationContext';

const NotificationBell = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead
  } = useNotifications();

  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);
    if (notifications.length === 0) {
      await fetchNotifications({ limit: 10 });
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShowAll(false);
  };

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      await markAsRead(notification.id);
    }
  };

  const handleMarkAllRead = async () => {
    await markAllAsRead();
  };

  const handleShowAll = async () => {
    setShowAll(true);
    await fetchNotifications({ limit: 50 });
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return <ErrorIcon sx={{ color: '#d32f2f' }} />;
      case 'high':
        return <WarningIcon sx={{ color: '#ed6c02' }} />;
      case 'medium':
        return <InfoIcon sx={{ color: '#0288d1' }} />;
      case 'low':
        return <CheckCircleIcon sx={{ color: '#2e7d32' }} />;
      default:
        return <InfoIcon sx={{ color: '#0288d1' }} />;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'low_stock':
        return <InventoryIcon sx={{ color: '#f57c00' }} />;
      case 'old_stock':
        return <HistoryIcon sx={{ color: '#5d4037' }} />;
      default:
        return <InfoIcon sx={{ color: '#0288d1' }} />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'error';
      case 'high':
        return 'warning';
      case 'medium':
        return 'info';
      case 'low':
        return 'success';
      default:
        return 'info';
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const displayNotifications = showAll ? notifications : notifications.slice(0, 5);

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{ 
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }
        }}
      >
        <Badge badgeContent={unreadCount} color="error">
          {unreadCount > 0 ? <NotificationIcon /> : <NotificationOffIcon />}
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 400,
            maxHeight: 600,
            overflow: 'hidden'
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* Header */}
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight="bold">
              Notifications
            </Typography>
            {unreadCount > 0 && (
              <Button 
                size="small" 
                onClick={handleMarkAllRead}
                sx={{ textTransform: 'none' }}
              >
                Mark all read
              </Button>
            )}
          </Box>
          {unreadCount > 0 && (
            <Typography variant="caption" color="text.secondary">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </Typography>
          )}
        </Box>

        {/* Content */}
        <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
          {loading && (
            <Box display="flex" justifyContent="center" p={2}>
              <CircularProgress size={24} />
            </Box>
          )}

          {error && (
            <Box p={2}>
              <Alert severity="error" size="small">
                {error}
              </Alert>
            </Box>
          )}

          {!loading && !error && notifications.length === 0 && (
            <Box p={3} textAlign="center">
              <NotificationOffIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                No notifications
              </Typography>
            </Box>
          )}

          {!loading && !error && notifications.length > 0 && (
            <List disablePadding>
              {displayNotifications.map((notification, index) => (
                <React.Fragment key={notification.id}>
                  <ListItem
                    alignItems="flex-start"
                    onClick={() => handleNotificationClick(notification)}
                    sx={{
                      cursor: 'pointer',
                      backgroundColor: notification.isRead ? 'transparent' : 'rgba(25, 118, 210, 0.08)',
                      '&:hover': {
                        backgroundColor: notification.isRead ? 'rgba(0, 0, 0, 0.04)' : 'rgba(25, 118, 210, 0.12)'
                      },
                      py: 1.5
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'transparent', width: 32, height: 32 }}>
                        {getTypeIcon(notification.type)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                          <Typography 
                            variant="body2" 
                            fontWeight={notification.isRead ? 'normal' : 'medium'}
                            sx={{ flex: 1, mr: 1 }}
                          >
                            {notification.title}
                          </Typography>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <Chip
                              size="small"
                              label={notification.severity}
                              color={getSeverityColor(notification.severity)}
                              variant="outlined"
                              sx={{ height: 20, fontSize: '0.7rem' }}
                            />
                            {!notification.isRead && (
                              <Box
                                sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  backgroundColor: 'primary.main'
                                }}
                              />
                            )}
                          </Box>
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography 
                            variant="caption" 
                            color="text.secondary"
                            sx={{ 
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}
                          >
                            {notification.message}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                            {formatTime(notification.createdAt)}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < displayNotifications.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </Box>

        {/* Footer */}
        {!loading && !error && notifications.length > 0 && (
          <Box sx={{ p: 1, borderTop: '1px solid #e0e0e0', textAlign: 'center' }}>
            {!showAll && notifications.length > 5 && (
              <Button 
                size="small" 
                onClick={handleShowAll}
                sx={{ textTransform: 'none' }}
              >
                Show all notifications
              </Button>
            )}
            {showAll && (
              <Typography variant="caption" color="text.secondary">
                Showing all {notifications.length} notifications
              </Typography>
            )}
          </Box>
        )}
      </Menu>
    </>
  );
};

export default NotificationBell;
