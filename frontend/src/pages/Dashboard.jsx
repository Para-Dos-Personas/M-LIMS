import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import dashboardService from '../services/dashboardService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import InventoryIcon from '@mui/icons-material/Inventory';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningIcon from '@mui/icons-material/Warning';
import HistoryIcon from '@mui/icons-material/History';

const Dashboard = () => {
  const [inwardData, setInwardData] = useState([]);
  const [outwardData, setOutwardData] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [oldStock, setOldStock] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [inward, outward, low, old] = await Promise.all([
          dashboardService.getInwardStats(),
          dashboardService.getOutwardStats(),
          dashboardService.getLowStock(),
          dashboardService.getOldStock(),
        ]);
        setInwardData(inward);
        setOutwardData(outward);
        setLowStock(low);
        setOldStock(old);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom color="primary" fontWeight={700}>
        Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={6}
            sx={{
              p: 3,
              background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
              borderRadius: 4,
            }}
          >
            <Box display="flex" alignItems="center" mb={2}>
              <InventoryIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" color="primary.dark">
                Inwarded Items This Month
              </Typography>
            </Box>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={inwardData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="component" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantity" fill="#1976d2" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={6}
            sx={{
              p: 3,
              background: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
              borderRadius: 4,
            }}
          >
            <Box display="flex" alignItems="center" mb={2}>
              <TrendingUpIcon color="error" sx={{ mr: 1 }} />
              <Typography variant="h6" color="error.dark">
                Outwarded Items This Month
              </Typography>
            </Box>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={outwardData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="component" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantity" fill="#ef5350" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={6}
            sx={{
              p: 3,
              background: 'linear-gradient(135deg, #fffde7 0%, #fff9c4 100%)',
              borderRadius: 4,
            }}
          >
            <Box display="flex" alignItems="center" mb={2}>
              <WarningIcon color="warning" sx={{ mr: 1 }} />
              <Typography variant="h6" color="warning.dark">
                Critical Low Stock
              </Typography>
            </Box>
            <ul>
              {lowStock.length === 0 ? (
                <li>No critical items.</li>
              ) : (
                lowStock.map((item) => (
                  <li key={item.id}>
                    <b>{item.name}</b> ({item.quantity} left)
                  </li>
                ))
              )}
            </ul>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={6}
            sx={{
              p: 3,
              background: 'linear-gradient(135deg, #ede7f6 0%, #d1c4e9 100%)',
              borderRadius: 4,
            }}
          >
            <Box display="flex" alignItems="center" mb={2}>
              <HistoryIcon color="secondary" sx={{ mr: 1 }} />
              <Typography variant="h6" color="secondary.dark">
                Old Stock Items
              </Typography>
            </Box>
            <ul>
              {oldStock.length === 0 ? (
                <li>No old stock items.</li>
              ) : (
                oldStock.map((item) => (
                  <li key={item.id}>
                    <b>{item.name}</b> (No movement since{' '}
                    {new Date(item.last_outward).toLocaleDateString()})
                  </li>
                ))
              )}
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;