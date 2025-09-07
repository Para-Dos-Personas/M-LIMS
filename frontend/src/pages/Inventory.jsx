// src/pages/Inventory.jsx

import React from 'react';
import ComponentTable from '../components/ComponentTable';
import {
  Typography,
  Container,
  Box,
  Paper,
  CircularProgress
} from '@mui/material';
import { useWarehouse } from '../contexts/WarehouseContext';

const Inventory = () => {
  const { selectedWarehouse, loading: warehouseLoading } = useWarehouse();

  // Normalize warehouseId: null fetches all, otherwise scope by ID
  const warehouseId =
    selectedWarehouse && selectedWarehouse.id !== 'all'
      ? selectedWarehouse.id
      : null;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
          borderRadius: 4
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          color="primary"
          fontWeight={700}
        >
          Inventory Management
        </Typography>
        <Typography variant="h6" gutterBottom color="text.secondary">
          Warehouse: {selectedWarehouse ? selectedWarehouse.name : 'None'}
        </Typography>

        {warehouseLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {!warehouseLoading && !selectedWarehouse && (
          <Typography sx={{ mt: 2 }}>
            Please select or create a warehouse to view inventory.
          </Typography>
        )}

        {!warehouseLoading && selectedWarehouse && (
          <ComponentTable warehouseId={warehouseId} />
        )}
      </Paper>
    </Container>
  );
};

export default Inventory;