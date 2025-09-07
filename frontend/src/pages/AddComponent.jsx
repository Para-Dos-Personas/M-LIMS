// src/pages/AddComponent.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Snackbar,
  Alert,
  Box,
  Chip,
} from '@mui/material';
import componentService from '../services/componentService';
import warehouseService from '../services/warehouseService';
import { useWarehouse } from '../contexts/WarehouseContext';

const AddComponent = () => {
  const navigate = useNavigate();
  const { selectedWarehouse } = useWarehouse();

  const [form, setForm] = useState({
    warehouseId: '',
    name: '',
    manufacturer: '',
    partNumber: '',
    description: '',
    quantity: '',
    location: '',
    unitPrice: '',
    datasheetLink: '',
    category: '',
    criticalThreshold: '10',
    manufactureMonth: '',
    manufactureYear: '',
    expiryMonth: '',
    expiryYear: '',
  });
  const [warehouses, setWarehouses] = useState([]);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // load all warehouses for dropdown
  useEffect(() => {
    warehouseService
      .getMyWarehouses()
      .then(res => setWarehouses(res.data))
      .catch(console.error);
  }, []);

  // default to context’s selectedWarehouse if one is set
  useEffect(() => {
    if (selectedWarehouse?.id && selectedWarehouse.id !== 'all') {
      setForm(prev => ({
        ...prev,
        warehouseId: String(selectedWarehouse.id),
      }));
    }
  }, [selectedWarehouse]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (!form.warehouseId) {
      setError('Please select a warehouse');
      return;
    }

    // build ISO dates if provided
    const manufactureDate =
      form.manufactureYear && form.manufactureMonth
        ? `${form.manufactureYear}-${String(form.manufactureMonth).padStart(2, '0')}-01`
        : null;
    const expiryDate =
      form.expiryYear && form.expiryMonth
        ? `${form.expiryYear}-${String(form.expiryMonth).padStart(2, '0')}-01`
        : null;

    try {
      const payload = {
        warehouseId: parseInt(form.warehouseId, 10),
        name: form.name,
        manufacturer: form.manufacturer,
        partNumber: form.partNumber,
        description: form.description,
        quantity: parseInt(form.quantity, 10),
        location: form.location,
        unitPrice: parseFloat(form.unitPrice),
        datasheetLink: form.datasheetLink,
        category: form.category,
        criticalThreshold: parseInt(form.criticalThreshold, 10),
        manufactureDate,
        expiryDate,
      };

      await componentService.create(payload);
      setOpenSnackbar(true);
      setTimeout(() => navigate('/inventory'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to add component');
    }
  };

  const isLowStock =
    form.quantity &&
    form.criticalThreshold &&
    parseInt(form.quantity, 10) <= parseInt(form.criticalThreshold, 10);

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 6, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Add New Component
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="warehouse-label">Warehouse</InputLabel>
            <Select
              labelId="warehouse-label"
              name="warehouseId"
              value={form.warehouseId}
              label="Warehouse"
              onChange={handleChange}
              // lock it down if context has a specific warehouse
              disabled={!!selectedWarehouse && selectedWarehouse.id !== 'all'}
            >
              {warehouses.map(w => (
                <MenuItem key={w.id} value={String(w.id)}>
                  {w.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            label="Manufacturer"
            name="manufacturer"
            value={form.manufacturer}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            label="Part Number"
            name="partNumber"
            value={form.partNumber}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Quantity"
            name="quantity"
            type="number"
            value={form.quantity}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            label="Location / Bin"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            label="Unit Price"
            name="unitPrice"
            type="number"
            value={form.unitPrice}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Manufacture Month"
              name="manufactureMonth"
              type="number"
              value={form.manufactureMonth}
              onChange={handleChange}
              required
              margin="normal"
              inputProps={{ min: 1, max: 12 }}
              helperText="1–12"
              sx={{ flex: 1 }}
            />
            <TextField
              label="Manufacture Year"
              name="manufactureYear"
              type="number"
              value={form.manufactureYear}
              onChange={handleChange}
              required
              margin="normal"
              inputProps={{ min: 2020, max: 2025 }}
              helperText="2020–2025"
              sx={{ flex: 1 }}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Expiry Month"
              name="expiryMonth"
              type="number"
              value={form.expiryMonth}
              onChange={handleChange}
              required
              margin="normal"
              inputProps={{ min: 1, max: 12 }}
              helperText="1–12"
              sx={{ flex: 1 }}
            />
            <TextField
              label="Expiry Year"
              name="expiryYear"
              type="number"
              value={form.expiryYear}
              onChange={handleChange}
              required
              margin="normal"
              inputProps={{ min: 2020, max: 2030 }}
              helperText="2020–2030"
              sx={{ flex: 1 }}
            />
          </Box>

          <TextField
            label="Critical Threshold"
            name="criticalThreshold"
            type="number"
            value={form.criticalThreshold}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            helperText="Quantity at which this item is considered low stock"
          />

          {isLowStock && (
            <Box sx={{ mt: 1, mb: 2 }}>
              <Chip
                label="Warning: This item will appear as low stock"
                color="warning"
                variant="outlined"
                size="small"
              />
            </Box>
          )}

          <TextField
            label="Datasheet Link"
            name="datasheetLink"
            value={form.datasheetLink}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              name="category"
              value={form.category}
              label="Category"
              onChange={handleChange}
            >
              <MenuItem value="Tablets">Tablets</MenuItem>
              <MenuItem value="Capsules">Capsules</MenuItem>
              <MenuItem value="Powder and Granules">Powder and Granules</MenuItem>
              <MenuItem value="Suppositories">Suppositories</MenuItem>
              <MenuItem value="Syrup and Elixirs">Syrup and Elixirs</MenuItem>
              <MenuItem value="Solutions and Suspensions">Solutions and Suspensions</MenuItem>
              <MenuItem value="Injections">Injections</MenuItem>
              <MenuItem value="Spray">Spray</MenuItem>
              <MenuItem value="Creams and Ointments">Creams and Ointments</MenuItem>
              <MenuItem value="Gel and Pastes">Gel and Pastes</MenuItem>
              <MenuItem value="Inhalers">Inhalers</MenuItem>
              <MenuItem value="Nebulizers">Nebulizers</MenuItem>
              <MenuItem value="Equipments">Equipments</MenuItem>
              <MenuItem value="Miscellaneous Lab Supplies">
                Miscellaneous Lab Supplies
              </MenuItem>
            </Select>
          </FormControl>

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Add Component
          </Button>
        </form>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Component added successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddComponent;