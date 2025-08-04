import React from 'react';
import { Paper, Typography } from '@mui/material';

const ChartCard = ({ title, children }) => (
  <Paper sx={{ p: 2, height: '100%' }} elevation={3}>
    <Typography variant="h6" gutterBottom>{title}</Typography>
    {children}
  </Paper>
);

export default ChartCard;