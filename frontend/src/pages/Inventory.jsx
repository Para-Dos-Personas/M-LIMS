// src/pages/Inventory.jsx

import React, { useState, useEffect } from 'react';
import ComponentTable from '../components/ComponentTable';
import { Typography, Container, Box, Paper, CircularProgress } from '@mui/material';
import { useWarehouse } from '../contexts/WarehouseContext';
import componentService from '../services/componentService';

const Inventory = () => {
  const { selectedWarehouse, loading: warehouseLoading } = useWarehouse();
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComponents = async () => {
      setLoading(true);
      setError('');

      try {
        // if selectedWarehouse.id === 'all', pass null to fetch every warehouse
        const warehouseId =
          selectedWarehouse && selectedWarehouse.id !== 'all'
            ? selectedWarehouse.id
            : null;

        const data = await componentService.getAll(warehouseId);
        setComponents(data);
      } catch (err) {
        console.error('Fetch components error:', err);
        setError('Failed to fetch inventory. You may not have access to this warehouse.');
      } finally {
        setLoading(false);
      }
    };

    // only run once warehouses finish loading
    if (!warehouseLoading) {
      fetchComponents();
    }
  }, [selectedWarehouse, warehouseLoading]);

  const isBusy = loading || warehouseLoading;

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
        <Typography variant="h6" gutterBottom color="text.secondary">
          Warehouse: {selectedWarehouse ? selectedWarehouse.name : 'None'}
        </Typography>

        {isBusy && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {!isBusy && error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {!isBusy && !error && !selectedWarehouse && (
          <Typography sx={{ mt: 2 }}>
            Please select or create a warehouse to view inventory.
          </Typography>
        )}

        {!isBusy && !error && selectedWarehouse && (
          <ComponentTable components={components} />
        )}
      </Paper>
    </Container>
  );
};

export default Inventory;