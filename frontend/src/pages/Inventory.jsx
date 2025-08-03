import React from 'react';
import ComponentTable from '../components/ComponentTable';
import { Typography, Container, Box } from '@mui/material';

const Inventory = () => {
  return (
    <Container maxWidth="lg">
      <Box mt={4} mb={2}>
        <Typography variant="h4" gutterBottom>
          Inventory Management
        </Typography>
      </Box>
      <ComponentTable />
    </Container>
  );
};

export default Inventory;