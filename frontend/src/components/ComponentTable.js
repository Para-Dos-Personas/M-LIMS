import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import componentService from '../services/componentService';

const ComponentTable = () => {
  const [components, setComponents] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openModal, setOpenModal] = useState(false);

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

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedRow(null);
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

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'part_number', headerName: 'Part No.', flex: 1 },
    { field: 'category', headerName: 'Category', flex: 1 },
    { field: 'quantity', headerName: 'Qty', width: 100 },
    { field: 'location', headerName: 'Location', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <Button variant="outlined" onClick={() => handleEditClick(params.row)}>
          Edit
        </Button>
      ),
      width: 120,
      sortable: false,
    },
  ];

  return (
    <>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={components}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
        />
      </div>

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
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ComponentTable;