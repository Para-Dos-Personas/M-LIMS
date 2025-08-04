import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import dashboardService from '../services/dashboardService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

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
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Inwarded Items This Month</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={inwardData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="component" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantity" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Outwarded Items This Month</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={outwardData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="component" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantity" fill="#ef5350" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Critical Low Stock</Typography>
            <ul>
              {lowStock.map((item) => (
                <li key={item.id}>{item.name} ({item.quantity} left)</li>
              ))}
            </ul>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Old Stock Items</Typography>
            <ul>
              {oldStock.map((item) => (
                <li key={item.id}>{item.name} (No movement since {new Date(item.last_outward).toLocaleDateString()})</li>
              ))}
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;