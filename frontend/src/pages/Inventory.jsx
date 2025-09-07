// src/pages/Inventory.jsx
import React, { useState, useEffect } from 'react';
import ComponentTable from '../components/ComponentTable';
import { Typography, Container, Box, Paper, CircularProgress } from '@mui/material';
import { useWarehouse } from '../contexts/WarehouseContext'; // 1. Import the context hook
import componentService from '../services/componentService';

const Inventory = () => {
  // 2. Get the selected warehouse from the global context
  const { selectedWarehouse, loading: warehouseLoading } = useWarehouse();
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 3. Fetch components whenever the selected warehouse changes
  useEffect(() => {
    const fetchComponents = async () => {
      // Make sure a warehouse is selected before fetching
      if (selectedWarehouse) {
        setLoading(true);
        setError('');
        try {
          // Pass the selected warehouse ID to your service function
          const data = await componentService.getAll(selectedWarehouse.id);
          setComponents(data);
        } catch (err) {
          setError('Failed to fetch inventory. You may not have access to this warehouse.');
          console.error("Fetch components error:", err);
        } finally {
          setLoading(false);
        }
      } else if (!warehouseLoading) {
        // If there's no selected warehouse and we're not loading warehouses, clear the list
        setComponents([]);
        setLoading(false);
      }
    };

    fetchComponents();
  }, [selectedWarehouse, warehouseLoading]); // This effect re-runs when the warehouse changes

  const renderContent = () => {
    if (loading || warehouseLoading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      );
    }
    if (error) {
      return <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>;
    }
    if (!selectedWarehouse) {
      return <Typography sx={{ mt: 2 }}>Please select or create a warehouse to view inventory.</Typography>;
    }
    // 4. Pass the fetched components down to the table as a prop
    return <ComponentTable components={components} />;
  };

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
          Warehouse: {selectedWarehouse ? selectedWarehouse.name : '...'}
        </Typography>
        {renderContent()}
      </Paper>
    </Container>
  );
};

export default Inventory;