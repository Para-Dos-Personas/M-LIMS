import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const OldStockCard = ({ items }) => (
  <Paper sx={{ p: 2 }} elevation={3}>
    <Typography variant="h6">Old Stock Items</Typography>
    <List>
      {items.length === 0 ? (
        <ListItem><ListItemText primary="No old stock items." /></ListItem>
      ) : (
        items.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={`${item.name} (Last used: ${new Date(item.last_outward).toLocaleDateString()})`} />
          </ListItem>
        ))
      )}
    </List>
  </Paper>
);

export default OldStockCard;