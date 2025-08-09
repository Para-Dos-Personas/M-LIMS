import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  Paper, 
  Box,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import logService from '../services/logService';

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await logService.getAllLogs();
      setLogs(data);
    } catch (err) {
      console.error('Failed to fetch logs:', err);
      setError('Failed to load logs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const getChangeTypeColor = (changeType) => {
    return changeType === 'inward' ? 'success' : 'error';
  };

  const getChangeTypeLabel = (changeType) => {
    return changeType === 'inward' ? 'Inward' : 'Outward';
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
          borderRadius: 4,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" color="purple" fontWeight={700}>
            Component Logs
          </Typography>
          <Tooltip title="Refresh logs">
            <IconButton onClick={fetchLogs} color="primary">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {logs.length === 0 ? (
          <Box textAlign="center" py={4}>
            <Typography variant="h6" color="text.secondary">
              No logs found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Component logs will appear here when you add or remove inventory items.
            </Typography>
          </Box>
        ) : (
          <Box sx={{ overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Component</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>User</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Reason</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Project</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Date & Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id} hover>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {log.Component?.name || `Component ${log.componentId}`}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ID: {log.componentId}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={getChangeTypeLabel(log.changeType)}
                        color={getChangeTypeColor(log.changeType)}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography 
                        variant="body2" 
                        color={log.changeType === 'inward' ? 'success.main' : 'error.main'}
                        fontWeight="medium"
                      >
                        {log.changeType === 'inward' ? '+' : '-'}{log.quantity}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {log.User?.username || `User ${log.userId}`}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" noWrap maxWidth={200}>
                        {log.reason || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" noWrap maxWidth={150}>
                        {log.project || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(log.createdAt).toLocaleDateString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(log.createdAt).toLocaleTimeString()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Logs;