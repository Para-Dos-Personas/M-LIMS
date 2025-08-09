import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Alert,
} from '@mui/material';
import logService from '../services/logService';

const LogModal = ({ open, onClose, componentId, onSuccess }) => {
  const [type, setType] = useState('inward');
  const [qty, setQty] = useState('');
  const [reason, setReason] = useState('');
  const [project, setProject] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!qty || qty <= 0) {
      setError('Please enter a valid quantity');
      return;
    }

    if (!reason.trim()) {
      setError('Please provide a reason for this movement');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('📝 Submitting log:', {
        componentId,
        changeType: type,
        quantity: qty,
        reason,
        project
      });

      const payload = {
        changeType: type,
        quantity: Number(qty),
        reason: reason.trim(),
        project: project.trim(),
      };

      await logService.create(componentId, payload);
      
      console.log('✅ Log submitted successfully');
      onSuccess();
      onClose();
      
      // Reset form
      setQty('');
      setReason('');
      setProject('');
      setType('inward');
    } catch (error) {
      console.error('❌ Log submission error:', error);
      setError(error.response?.data?.error || 'Failed to submit log. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError('');
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Log Stock Movement</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          select
          label="Movement Type"
          fullWidth
          margin="dense"
          value={type}
          onChange={(e) => setType(e.target.value)}
          helperText={type === 'inward' ? 'Adding items to inventory' : 'Removing items from inventory'}
        >
          <MenuItem value="inward">Inward (Add)</MenuItem>
          <MenuItem value="outward">Outward (Remove)</MenuItem>
        </TextField>

        <TextField
          label="Quantity"
          type="number"
          fullWidth
          margin="dense"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          helperText="Number of items to add or remove"
          required
        />

        <TextField
          label="Reason"
          fullWidth
          margin="dense"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          helperText="Why are you adding/removing these items?"
          required
        />

        <TextField
          label="Project (Optional)"
          fullWidth
          margin="dense"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          helperText="Project name if applicable"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Log Movement'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogModal;