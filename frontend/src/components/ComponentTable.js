import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box } from '@mui/material';
import componentService from '../services/componentService';
import LogModal from './LogModal';

const ComponentTable = () => {
  const [components, setComponents] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openLogModal, setOpenLogModal] = useState(false);
  const [selectedComponentId, setSelectedComponentId] = useState(null);

  // Search/filter state
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [minQty, setMinQty] = useState('');
  const [maxQty, setMaxQty] = useState('');

  const fetchComponents = async () => {
    try {
      const data = await componentService.getAll();
      setComponents(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComponents();
  }, []);

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  const handleLogClick = (row) => {
    setSelectedComponentId(row.id);
    setOpenLogModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedRow(null);
  };

  const handleLogModalClose = () => {
    setOpenLogModal(false);
    setSelectedComponentId(null);
  };

  const handleSave = async () => {
    try {
      await componentService.update(selectedRow.id, selectedRow);
      fetchComponents();
      handleModalClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogSuccess = () => {
    fetchComponents(); // Refresh the component list after logging
  };

  // Filtering logic
  const filteredComponents = components.filter((c) =>
    (c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.part_number?.toLowerCase().includes(search.toLowerCase())) &&
    (category ? c.category?.toLowerCase().includes(category.toLowerCase()) : true) &&
    (location ? c.location?.toLowerCase().includes(location.toLowerCase()) : true) &&
    (minQty ? Number(c.quantity) >= Number(minQty) : true) &&
    (maxQty ? Number(c.quantity) <= Number(maxQty) : true)
  );

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'part_number', headerName: 'Part No.', flex: 1 },
    { field: 'category', headerName: 'Category', flex: 1 },
    { field: 'quantity', headerName: 'Qty', width: 100 },
    { field: 'location', headerName: 'Location', flex: 1 },
    { field: 'critical_low', headerName: 'Critical Low', width: 120 }, // Show threshold
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            variant="outlined" 
            size="small"
            onClick={() => handleEditClick(params.row)}
          >
            Edit
          </Button>
          <Button 
            variant="contained" 
            color="secondary"
            size="small"
            onClick={() => handleLogClick(params.row)}
          >
            Log Movement
          </Button>
        </Box>
      ),
      width: 200,
      sortable: false,
    },
  ];

  return (
    <>
      {/* Search/Filter Bar */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Search Name/Part #"
          value={search}
          onChange={e => setSearch(e.target.value)}
          size="small"
        />
        <TextField
          label="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          size="small"
        />
        <TextField
          label="Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
          size="small"
        />
        <TextField
          label="Min Qty"
          type="number"
          value={minQty}
          onChange={e => setMinQty(e.target.value)}
          size="small"
        />
        <TextField
          label="Max Qty"
          type="number"
          value={maxQty}
          onChange={e => setMaxQty(e.target.value)}
          size="small"
        />
      </Box>

      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={filteredComponents}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
        />
      </div>

      {/* Edit Component Modal */}
      <Dialog open={openModal} onClose={handleModalClose}>
        <DialogTitle>Edit Component</DialogTitle>
        <DialogContent>
          {selectedRow && (
            <>
              <TextField
                margin="dense"
                label="Name"
                fullWidth
                value={selectedRow.name}
                onChange={(e) => setSelectedRow({ ...selectedRow, name: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Part Number"
                fullWidth
                value={selectedRow.part_number}
                onChange={(e) => setSelectedRow({ ...selectedRow, part_number: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Category"
                fullWidth
                value={selectedRow.category}
                onChange={(e) => setSelectedRow({ ...selectedRow, category: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Quantity"
                fullWidth
                type="number"
                value={selectedRow.quantity}
                onChange={(e) => setSelectedRow({ ...selectedRow, quantity: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Location"
                fullWidth
                value={selectedRow.location}
                onChange={(e) => setSelectedRow({ ...selectedRow, location: e.target.value })}
              />
              {/* Critical Low Threshold Field */}
              <TextField
                margin="dense"
                label="Critical Low Threshold"
                fullWidth
                type="number"
                value={selectedRow.critical_low || ''}
                onChange={(e) => setSelectedRow({ ...selectedRow, critical_low: e.target.value })}
                helperText="Set the critical low quantity for this component"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Log Movement Modal */}
      <LogModal
        open={openLogModal}
        onClose={handleLogModalClose}
        componentId={selectedComponentId}
        onSuccess={handleLogSuccess}
      />
    </>
  );
};

export default ComponentTable;