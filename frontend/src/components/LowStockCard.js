
import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const LowStockCard = ({ items }) => (
  <Paper sx={{ p: 2 }} elevation={3}>
    <Typography variant="h6">Critical Low Stock</Typography>
    <List>
      {items.length === 0 ? (
        <ListItem><ListItemText primary="No critical items." /></ListItem>
      ) : (
        items.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={`${item.name} (${item.quantity} left)`} />
          </ListItem>
        ))
      )}
    </List>
  </Paper>
);

export default LowStockCard;