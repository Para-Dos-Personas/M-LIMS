import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper, Box } from '@mui/material';
import logService from '../services/logService';

const Logs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await logService.getAllLogs();
        setLogs(data);
      } catch (err) {
        console.error('Failed to fetch logs:', err);
      }
    };

    fetchLogs();
  }, []);

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
        <Typography variant="h4" gutterBottom color="purple" fontWeight={700}>
          Component Logs
        </Typography>
        <Box sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Component ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Timestamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.component_id}</TableCell>
                  <TableCell>{log.change_type}</TableCell>
                  <TableCell>{log.qty_change}</TableCell>
                  <TableCell>{log.user_id}</TableCell>
                  <TableCell>{log.reason}</TableCell>
                  <TableCell>{log.project}</TableCell>
                  <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Container>
  );
};

export default Logs;