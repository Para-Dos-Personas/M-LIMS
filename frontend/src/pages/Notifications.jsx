import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Button,
  IconButton,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  Grid,
  Avatar,
  Divider,
  Tooltip
} from '@mui/material';
import {
  NotificationsOutlined as NotificationIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Error as ErrorIcon,
  CheckCircle as CheckCircleIcon,
  Inventory as InventoryIcon,
  History as HistoryIcon,
  Refresh as RefreshIcon,
  MarkAsUnread as MarkAsUnreadIcon,
  DoneAll as DoneAllIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { useNotifications } from '../contexts/NotificationContext';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(1);
  const {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    triggerChecks,
    setError
  } = useNotifications();

  useEffect(() => {
    fetchNotifications({ page: 1, limit: 50 });
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setPage(1);
    
    const filters = {};
    if (newValue === 1) filters.unreadOnly = true;
    if (newValue === 2) filters.type = 'low_stock';
    if (newValue === 3) filters.type = 'old_stock';
    
    fetchNotifications({ ...filters, page: 1, limit: 50 });
  };

  const handleRefresh = () => {
    const filters = {};
    if (activeTab === 1) filters.unreadOnly = true;
    if (activeTab === 2) filters.type = 'low_stock';
    if (activeTab === 3) filters.type = 'old_stock';
    
    fetchNotifications({ ...filters, page: 1, limit: 50 });
  };

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      await markAsRead(notification.id);
    }
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
        return <InventoryIcon />;
      case 'old_stock':
        return <HistoryIcon />;
      default:
        return <InfoIcon />;
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

  const getTypeLabel = (type) => {
    switch (type) {
      case 'low_stock':
        return 'Low Stock';
      case 'old_stock':
        return 'Old Stock';
      default:
        return type;
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
      relative: getRelativeTime(date)
    };
  };

  const getRelativeTime = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} day${Math.floor(diffInHours / 24) !== 1 ? 's' : ''} ago`;
    return `${Math.floor(diffInHours / 168)} week${Math.floor(diffInHours / 168) !== 1 ? 's' : ''} ago`;
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 1) return !notification.isRead;
    if (activeTab === 2) return notification.type === 'low_stock';
    if (activeTab === 3) return notification.type === 'old_stock';
    return true;
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper
        elevation={6}
        sx={{
          background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
          borderRadius: 4,
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <Box sx={{ p: 4, pb: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <NotificationIcon />
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight={700} color="primary">
                  Notifications
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Stay updated with inventory alerts and system notifications
                </Typography>
              </Box>
            </Box>
            <Box display="flex" gap={1}>
              <Tooltip title="Refresh notifications">
                <IconButton onClick={handleRefresh} disabled={loading}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
              {unreadCount > 0 && (
                <Tooltip title="Mark all as read">
                  <IconButton onClick={markAllAsRead}>
                    <DoneAllIcon />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="Trigger notification checks">
                <IconButton onClick={triggerChecks}>
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Statistics */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6} sm={3}>
              <Card variant="outlined" sx={{ textAlign: 'center', py: 1 }}>
                <Typography variant="h6" color="primary">
                  {notifications.length}
                </Typography>
                <Typography variant="caption">Total</Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card variant="outlined" sx={{ textAlign: 'center', py: 1 }}>
                <Typography variant="h6" color="error">
                  {unreadCount}
                </Typography>
                <Typography variant="caption">Unread</Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card variant="outlined" sx={{ textAlign: 'center', py: 1 }}>
                <Typography variant="h6" color="warning.main">
                  {notifications.filter(n => n.type === 'low_stock').length}
                </Typography>
                <Typography variant="caption">Low Stock</Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card variant="outlined" sx={{ textAlign: 'center', py: 1 }}>
                <Typography variant="h6" color="info.main">
                  {notifications.filter(n => n.type === 'old_stock').length}
                </Typography>
                <Typography variant="caption">Old Stock</Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'white' }}>
          <Tabs value={activeTab} onChange={handleTabChange} sx={{ px: 4 }}>
            <Tab label="All Notifications" />
            <Tab label={`Unread (${unreadCount})`} />
            <Tab label="Low Stock Alerts" />
            <Tab label="Old Stock Alerts" />
          </Tabs>
        </Box>

        {/* Content */}
        <Box sx={{ p: 4, bgcolor: 'white', minHeight: 400 }}>
          {loading && (
            <Box display="flex" justifyContent="center" py={8}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {!loading && !error && filteredNotifications.length === 0 && (
            <Box textAlign="center" py={8}>
              <NotificationIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No notifications found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {activeTab === 1 && "You're all caught up! No unread notifications."}
                {activeTab === 2 && "No low stock alerts at the moment."}
                {activeTab === 3 && "No old stock alerts at the moment."}
                {activeTab === 0 && "No notifications available."}
              </Typography>
            </Box>
          )}

          {!loading && !error && filteredNotifications.length > 0 && (
            <Box>
              {filteredNotifications.map((notification, index) => {
                const timeInfo = formatTime(notification.createdAt);
                return (
                  <Card
                    key={notification.id}
                    sx={{
                      mb: 2,
                      border: notification.isRead ? '1px solid #e0e0e0' : '2px solid #1976d2',
                      backgroundColor: notification.isRead ? 'white' : 'rgba(25, 118, 210, 0.04)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        boxShadow: 4,
                        transform: 'translateY(-2px)'
                      }
                    }}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <CardContent>
                      <Box display="flex" gap={2}>
                        <Avatar sx={{ bgcolor: 'transparent', color: 'primary.main' }}>
                          {getTypeIcon(notification.type)}
                        </Avatar>
                        <Box flex={1}>
                          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                            <Typography 
                              variant="h6" 
                              fontWeight={notification.isRead ? 'normal' : 'bold'}
                              sx={{ flex: 1 }}
                            >
                              {notification.title}
                            </Typography>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Chip
                                size="small"
                                label={notification.severity.toUpperCase()}
                                color={getSeverityColor(notification.severity)}
                                icon={getSeverityIcon(notification.severity)}
                              />
                              <Chip
                                size="small"
                                label={getTypeLabel(notification.type)}
                                variant="outlined"
                              />
                              {!notification.isRead && (
                                <Box
                                  sx={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: '50%',
                                    backgroundColor: 'primary.main'
                                  }}
                                />
                              )}
                            </Box>
                          </Box>
                          
                          <Typography variant="body2" color="text.secondary" paragraph>
                            {notification.message}
                          </Typography>

                          {notification.metadata && (
                            <Box sx={{ mb: 2 }}>
                              <Grid container spacing={2}>
                                {notification.metadata.currentQuantity !== undefined && (
                                  <Grid item xs={6} sm={3}>
                                    <Typography variant="caption" color="text.secondary">
                                      Current Quantity
                                    </Typography>
                                    <Typography variant="body2" fontWeight="medium">
                                      {notification.metadata.currentQuantity}
                                    </Typography>
                                  </Grid>
                                )}
                                {notification.metadata.criticalThreshold !== undefined && (
                                  <Grid item xs={6} sm={3}>
                                    <Typography variant="caption" color="text.secondary">
                                      Critical Threshold
                                    </Typography>
                                    <Typography variant="body2" fontWeight="medium">
                                      {notification.metadata.criticalThreshold}
                                    </Typography>
                                  </Grid>
                                )}
                                {notification.metadata.location && (
                                  <Grid item xs={6} sm={3}>
                                    <Typography variant="caption" color="text.secondary">
                                      Location
                                    </Typography>
                                    <Typography variant="body2" fontWeight="medium">
                                      {notification.metadata.location}
                                    </Typography>
                                  </Grid>
                                )}
                                {notification.metadata.partNumber && (
                                  <Grid item xs={6} sm={3}>
                                    <Typography variant="caption" color="text.secondary">
                                      Part Number
                                    </Typography>
                                    <Typography variant="body2" fontWeight="medium">
                                      {notification.metadata.partNumber}
                                    </Typography>
                                  </Grid>
                                )}
                              </Grid>
                            </Box>
                          )}

                          <Box display="flex" justifyContent="between" alignItems="center">
                            <Typography variant="caption" color="text.secondary">
                              {timeInfo.relative} • {timeInfo.date} at {timeInfo.time}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Notifications;