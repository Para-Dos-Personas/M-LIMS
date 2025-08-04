import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Box,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import notificationService from '../services/notificationService';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const data = await notificationService.getAll();
      setNotifications(data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      fetchNotifications();
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          background: 'linear-gradient(135deg, #fffde7 0%, #ffe082 100%)',
          borderRadius: 4,
        }}
      >
        <Typography variant="h4" gutterBottom color="warning.main" fontWeight={700}>
          Notifications
        </Typography>
        <Box>
          <List>
            {notifications.length === 0 && (
              <ListItem>
                <ListItemText primary="No notifications." />
              </ListItem>
            )}

            {notifications.map((n) => (
              <ListItem key={n.id} secondaryAction={!n.is_read && (
                <IconButton edge="end" onClick={() => handleMarkAsRead(n.id)}>
                  <CheckIcon />
                </IconButton>
              )}>
                <ListItemText
                  primary={n.message}
                  secondary={`Type: ${n.type} • Date: ${new Date(n.created_at).toLocaleDateString()} ${n.is_read ? '(Read)' : '(Unread)'}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Container>
  );
};

export default Notifications;