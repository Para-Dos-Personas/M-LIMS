import React from 'react';
import ComponentTable from '../components/ComponentTable';
import { Typography, Container, Box, Paper } from '@mui/material';

const Inventory = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
          borderRadius: 4,
        }}
      >
        <Typography variant="h4" gutterBottom color="primary" fontWeight={700}>
          Inventory Management
        </Typography>
        <ComponentTable />
      </Paper>
    </Container>
  );
};

export default Inventory;