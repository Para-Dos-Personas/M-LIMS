import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
} from '@mui/material';
import logService from '../services/logService';

const LogModal = ({ open, onClose, componentId, onSuccess }) => {
  const [type, setType] = useState('inward');
  const [qty, setQty] = useState(0);
  const [reason, setReason] = useState('');
  const [project, setProject] = useState('');

  const handleSubmit = async () => {
    try {
      const payload = {
        component_id: componentId,
        change_type: type,
        qty_change: Number(qty),
        reason,
        project,
      };
      await logService.create(componentId, payload);
      onSuccess();
      onClose();
      setQty(0);
      setReason('');
      setProject('');
    } catch (error) {
      console.error('Log submission error:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Log Stock Movement</DialogTitle>
      <DialogContent>
        <TextField
          select
          label="Type"
          fullWidth
          margin="dense"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="inward">Inward</MenuItem>
          <MenuItem value="outward">Outward</MenuItem>
        </TextField>

        <TextField
          label="Quantity"
          type="number"
          fullWidth
          margin="dense"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />

        <TextField
          label="Reason"
          fullWidth
          margin="dense"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <TextField
          label="Project (if applicable)"
          fullWidth
          margin="dense"
          value={project}
          onChange={(e) => setProject(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Log
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogModal;