import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, Box, Chip, Alert } from '@mui/material';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const [inwardResponse, outwardResponse, low, old] = await Promise.all([
          dashboardService.getInwardStats(),
          dashboardService.getOutwardStats(),
          dashboardService.getLowStock(),
          dashboardService.getOldStock(),
        ]);
        const inwardChartData = inwardResponse.logs ? inwardResponse.logs.map(log => ({
          component: log.Component?.name || `Component ${log.componentId}`,
          quantity: log.quantity
        })) : [];
        const outwardChartData = outwardResponse.logs ? outwardResponse.logs.map(log => ({
          component: log.Component?.name || `Component ${log.componentId}`,
          quantity: log.quantity
        })) : [];

        setInwardData(inwardChartData);
        setOutwardData(outwardChartData);
        setLowStock(Array.isArray(low) ? low : []);
        setOldStock(Array.isArray(old) ? old : []);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
        setInwardData([]);
        setOutwardData([]);
        setLowStock([]);
        setOldStock([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const getLowStockSeverity = (quantity, threshold) => {
    if (quantity === 0) return 'error';
    if (quantity <= Math.min(3, threshold * 0.3)) return 'warning';
    return 'info';
  };

  const getLowStockColor = (quantity, threshold) => {
    if (quantity === 0) return '#d32f2f';
    if (quantity <= Math.min(3, threshold * 0.3)) return '#ed6c02';
    return '#1976d2';
  };

  const getLowStockLabel = (quantity, threshold) => {
    if (quantity === 0) return 'CRITICAL';
    if (quantity <= Math.min(3, threshold * 0.3)) return 'WARNING';
    return 'LOW';
  };

  // Chart styles to remove hover effects
  const chartStyles = {
    '& .recharts-bar-rectangle': {
      filter: 'none !important',
      opacity: '1 !important',
    },
    '& .recharts-bar-rectangle:hover': {
      filter: 'none !important',
      opacity: '1 !important',
    },
    '& .recharts-active-bar': {
      filter: 'none !important',
      opacity: '1 !important',
    },
    '& .recharts-bar': {
      filter: 'none !important',
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h3" gutterBottom color="primary" fontWeight={700}>
          Dashboard
        </Typography>
        <Typography>Loading dashboard data...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h3" gutterBottom color="primary" fontWeight={700}>
          Dashboard
        </Typography>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  // Reusable card style
  const cardStyle = (gradient) => ({
    p: 3,
    borderRadius: 4,
    background: gradient,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-6px) scale(1.02)',
      boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
    },
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: 700,
          background: 'linear-gradient(90deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Dashboard
      </Typography>

      <Grid container spacing={4}>
        {/* Inwarded Items */}
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={cardStyle('linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)')}>
            <Box display="flex" alignItems="center" mb={2}>
              <InventoryIcon sx={{ mr: 1, color: '#1565c0' }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#0d47a1' }}>
                Inwarded Items This Month
              </Typography>
            </Box>
            {inwardData.length > 0 ? (
              <Box sx={chartStyles}>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={inwardData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="component" />
                    <YAxis />
                    <Tooltip cursor={{ fill: 'transparent' }} />
                    <Legend />
                    <Bar
                      dataKey="quantity"
                      fill="#1976d2"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary" align="center">
                No inward data available for this month
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Outwarded Items */}
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={cardStyle('linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)')}>
            <Box display="flex" alignItems="center" mb={2}>
              <TrendingUpIcon sx={{ mr: 1, color: '#b71c1c' }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#880e4f' }}>
                Outwarded Items This Month
              </Typography>
            </Box>
            {outwardData.length > 0 ? (
              <Box sx={chartStyles}>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={outwardData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="component" />
                    <YAxis />
                    <Tooltip cursor={{ fill: 'transparent' }} />
                    <Legend />
                    <Bar
                      dataKey="quantity"
                      fill="#ef5350"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary" align="center">
                No outward data available for this month
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Critical Low Stock */}
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={cardStyle('linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)')}>
            <Box display="flex" alignItems="center" mb={2}>
              <WarningIcon sx={{ mr: 1, color: '#f57c00' }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#e65100' }}>
                Critical Low Stock ({lowStock.length} items)
              </Typography>
            </Box>
            {lowStock.length === 0 ? (
              <Box textAlign="center" py={2}>
                <Typography variant="body2" color="text.secondary">
                  No critical items found.
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Items with quantity ≤ their critical threshold are considered low stock.
                </Typography>
              </Box>
            ) : (
              <Box>
                {lowStock.map((item) => (
                  <Box key={item.id} sx={{ mb: 2, p: 2, bgcolor: 'rgba(255,255,255,0.7)', borderRadius: 2 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="body1" fontWeight="medium">
                        {item.name}
                      </Typography>
                      <Chip
                        label={`${item.quantity}/${item.criticalThreshold} - ${getLowStockLabel(item.quantity, item.criticalThreshold)}`}
                        color={getLowStockSeverity(item.quantity, item.criticalThreshold)}
                        size="small"
                        sx={{
                          bgcolor: getLowStockColor(item.quantity, item.criticalThreshold),
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      Location: {item.location} | Part: {item.partNumber}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Old Stock */}
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={cardStyle('linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)')}>
            <Box display="flex" alignItems="center" mb={2}>
              <HistoryIcon sx={{ mr: 1, color: '#4527a0' }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#311b92' }}>
                Old Stock Items ({oldStock.length} items)
              </Typography>
            </Box>
            {oldStock.length === 0 ? (
              <Box textAlign="center" py={2}>
                <Typography variant="body2" color="text.secondary">
                  No old stock items found.
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Items older than 6 months are considered old stock.
                </Typography>
              </Box>
            ) : (
              <Box>
                {oldStock.map((item) => (
                  <Box key={item.id} sx={{ mb: 2, p: 2, bgcolor: 'rgba(255,255,255,0.7)', borderRadius: 2 }}>
                    <Typography variant="body1" fontWeight="medium" mb={1}>
                      {item.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Added: {new Date(item.createdAt).toLocaleDateString()} |
                      Qty: {item.quantity} | Location: {item.location}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;