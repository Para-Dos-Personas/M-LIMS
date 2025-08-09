import React, { useState } from 'react';
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

const AddComponent = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
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
  });
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Parse numeric fields
      const payload = {
        ...form,
        quantity: parseInt(form.quantity, 10),
        unitPrice: parseFloat(form.unitPrice),
        criticalThreshold: parseInt(form.criticalThreshold, 10),
      };

      await componentService.create(payload);
      setOpenSnackbar(true);
      setTimeout(() => navigate('/inventory'), 1500);
    } catch (err) {
      setError(err.message || 'Failed to add component');
    }
  };

  // Calculate if current quantity would be low stock
  const isLowStock = form.quantity && form.criticalThreshold && 
    parseInt(form.quantity) <= parseInt(form.criticalThreshold);

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 6, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Add New Component
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
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
                label="⚠️ This item will appear as low stock" 
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

          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              name="category"
              value={form.category}
              label="Category"
              onChange={handleChange}
            >
              <MenuItem value="Microcontrollers">Microcontrollers</MenuItem>
              <MenuItem value="Single Board Computers">Single Board Computers</MenuItem>
              <MenuItem value="LEDs">LEDs</MenuItem>
              <MenuItem value="Prototyping">Prototyping</MenuItem>
              <MenuItem value="Connectors">Connectors</MenuItem>
              <MenuItem value="Passive">Passive</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Electromechanical">Electromechanical</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
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