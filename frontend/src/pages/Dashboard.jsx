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
        console.log('🔄 Fetching dashboard data...');
        
        const [inwardResponse, outwardResponse, low, old] = await Promise.all([
          dashboardService.getInwardStats(),
          dashboardService.getOutwardStats(),
          dashboardService.getLowStock(),
          dashboardService.getOldStock(),
        ]);

        console.log('📊 Dashboard data received:', {
          inward: inwardResponse,
          outward: outwardResponse,
          lowStock: low,
          oldStock: old
        });

        // Transform inward data for chart
        const inwardChartData = inwardResponse.logs ? inwardResponse.logs.map(log => ({
          component: log.Component?.name || `Component ${log.componentId}`,
          quantity: log.quantity
        })) : [];

        // Transform outward data for chart
        const outwardChartData = outwardResponse.logs ? outwardResponse.logs.map(log => ({
          component: log.Component?.name || `Component ${log.componentId}`,
          quantity: log.quantity
        })) : [];

        setInwardData(inwardChartData);
        setOutwardData(outwardChartData);
        setLowStock(Array.isArray(low) ? low : []);
        setOldStock(Array.isArray(old) ? old : []);
        setError(null);
        
        console.log('✅ Dashboard data processed successfully');
      } catch (err) {
        console.error('❌ Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
        // Set empty arrays to prevent chart errors
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
            {inwardData.length > 0 ? (
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
            ) : (
              <Typography variant="body2" color="text.secondary" align="center">
                No inward data available for this month
              </Typography>
            )}
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
            {outwardData.length > 0 ? (
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
            ) : (
              <Typography variant="body2" color="text.secondary" align="center">
                No outward data available for this month
              </Typography>
            )}
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