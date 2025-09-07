import React, { useState } from 'react';
import { Button, Menu, MenuItem, Typography, Box, CircularProgress } from '@mui/material';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import { useWarehouse } from '../contexts/WarehouseContext';

const WarehouseSwitcher = () => {
  const { warehouses, selectedWarehouse, selectWarehouse, loading } = useWarehouse();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleSelect = (warehouse) => {
    selectWarehouse(warehouse);
    handleClose();
  };

  if (loading) {
    return <CircularProgress size={24} color="inherit" />;
  }
  
  if (!selectedWarehouse) {
    // This message shows if the API returns no warehouses at all.
    return <Typography variant="caption" sx={{ color: '#8e24aa' }}>No Warehouses Found</Typography>;
  }

  return (
    <Box>
      <Button
        onClick={handleClick}
        startIcon={<WarehouseIcon />}
        variant="outlined"
        sx={{
          color: '#4a148c',
          borderColor: '#ce93d8',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#f3e5f5',
            borderColor: '#ba68c8'
          }
        }}
      >
        {selectedWarehouse.name}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {warehouses.map((warehouse) => (
          <MenuItem
            key={warehouse.id}
            selected={warehouse.id === selectedWarehouse.id}
            onClick={() => handleSelect(warehouse)}
          >
            {warehouse.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default WarehouseSwitcher;
