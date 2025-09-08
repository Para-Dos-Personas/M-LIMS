// src/pages/WarehouseManagement.jsx
import React, { useState, useEffect } from 'react';
import {
  getAllWarehouses,
  getMyWarehouses,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse
} from '../services/warehouseService';
import auth from '../utils/auth';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Typography
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

export default function WarehouseManagement() {
  const [warehouses, setWarehouses] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', location: '' });

  const isAdmin = auth.getUser()?.role === 'Admin';

  // load list
  const load = async () => {
    try {
      const res = isAdmin
        ? await getAllWarehouses()
        : await getMyWarehouses();
      setWarehouses(res.data);
    } catch (err) {
      console.error('Failed to load warehouses', err);
      setWarehouses([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // open add dialog
  const onAdd = () => {
    setEditing(null);
    setForm({ name: '', location: '' });
    setDialogOpen(true);
  };

  // open edit dialog
  const onEdit = (wh) => {
    setEditing(wh);
    setForm({ name: wh.name || '', location: wh.location || '' });
    setDialogOpen(true);
  };

  // save add or update
  const onSave = async () => {
    if (!form.name.trim()) return;
    if (editing) {
      await updateWarehouse(editing.id, form);
    } else {
      await createWarehouse(form);
    }
    setDialogOpen(false);
    load();
  };

  // delete
  const onDelete = async (id) => {
    if (!window.confirm('Delete this warehouse?')) return;
    await deleteWarehouse(id);
    load();
  };

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Warehouse Management
      </Typography>

      {isAdmin && (
        <Button variant="contained" onClick={onAdd} sx={{ mb: 2 }}>
          Add Warehouse
        </Button>
      )}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            {isAdmin && <TableCell align="right">Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {warehouses.map((wh) => (
            <TableRow key={wh.id}>
              <TableCell>{wh.name}</TableCell>
              <TableCell>{wh.location}</TableCell>
              {isAdmin && (
                <TableCell align="right">
                  <IconButton size="small" onClick={() => onEdit(wh)}>
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => onDelete(wh.id)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>
          {editing ? 'Edit Warehouse' : 'New Warehouse'}
        </DialogTitle>
        <DialogContent sx={{ minWidth: 320 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={form.name}
            onChange={(e) =>
              setForm((f) => ({ ...f, name: e.target.value }))
            }
          />
          <TextField
            margin="dense"
            label="Location"
            fullWidth
            value={form.location}
            onChange={(e) =>
              setForm((f) => ({ ...f, location: e.target.value }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={onSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}