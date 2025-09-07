import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, Box, Chip, Alert, CircularProgress } from '@mui/material';
import dashboardService from '../services/dashboardService';
import { useWarehouse } from '../contexts/WarehouseContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import InventoryIcon from '@mui/icons-material/Inventory';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningIcon from '@mui/icons-material/Warning';
import HistoryIcon from '@mui/icons-material/History';
import DangerousIcon from '@mui/icons-material/Dangerous';

const Dashboard = () => {
  // Use a single state object for dashboard data for easier management
  const [dashboardData, setDashboardData] = useState({
    inward: [],
    outward: [],
    lowStock: [],
    oldStock: [],
    expiredStock: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the selected warehouse and its loading state from the global context
  const { selectedWarehouse, loading: warehouseLoading } = useWarehouse();

  // Helper function to process and group chart data
  const processChartData = (logs) => {
    if (!logs || !Array.isArray(logs)) return [];
    const groupedData = logs.reduce((acc, log) => {
      const componentName = log.Component?.name || `Component ${log.componentId}`;
      acc[componentName] = (acc[componentName] || 0) + log.quantity;
      return acc;
    }, {});
    return Object.entries(groupedData)
      .map(([component, quantity]) => ({ component, quantity }))
      .sort((a, b) => a.component.localeCompare(b.component));
  };

  // This effect now fetches data based on the selectedWarehouse
  useEffect(() => {
    const fetchDashboardData = async () => {
      // Only fetch data if a warehouse has been selected from the context
      if (selectedWarehouse) {
        setLoading(true);
        setError(null);
        try {
          // Handle the 'all' case for admins by passing null to the service
          const warehouseId = selectedWarehouse.id === 'all' ? null : selectedWarehouse.id;
          
          // Pass the selected warehouse ID to every service call
          const [inwardResponse, outwardResponse, lowStockResponse, oldStockResponse, expiredStockResponse] = await Promise.all([
            dashboardService.getInwardStats(null, warehouseId),
            dashboardService.getOutwardStats(null, warehouseId),
            dashboardService.getLowStock(warehouseId),
            dashboardService.getOldStock(warehouseId),
            dashboardService.getExpiredStock(warehouseId)
          ]);

          setDashboardData({
            inward: processChartData(inwardResponse.logs),
            outward: processChartData(outwardResponse.logs),
            lowStock: lowStockResponse || [],
            oldStock: oldStockResponse || [],
            expiredStock: expiredStockResponse || [],
          });

        } catch (err) {
          console.error('❌ Error fetching dashboard data:', err);
          setError('Failed to load dashboard data.');
        } finally {
          setLoading(false);
        }
      } else {
        // If no warehouse is selected, clear data and stop loading
        setLoading(false);
        setDashboardData({ inward: [], outward: [], lowStock: [], oldStock: [], expiredStock: [] });
      }
    };

    // Do not fetch data until the warehouse context has finished loading its initial state
    if (!warehouseLoading) {
      fetchDashboardData();
    }
  }, [selectedWarehouse, warehouseLoading]); // Re-run this effect whenever the selected warehouse changes

  // Helper functions for styling remain the same
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

  const scrollableChartBox = {
    width: '100%',
    overflowX: 'auto',
    overflowY: 'hidden',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': { display: 'none' }
  };
  
  if (warehouseLoading || loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography>Loading Dashboard...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!selectedWarehouse) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="info">Please select a warehouse to view its dashboard.</Alert>
      </Container>
    );
  }

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
        Dashboard: {selectedWarehouse.name}
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
            <Paper elevation={6} sx={cardStyle('linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)')}>
                <Box display="flex" alignItems="center" mb={2}>
                    <InventoryIcon sx={{ mr: 1, color: '#1565c0' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#0d47a1' }}>
                        Inwarded Items This Month
                    </Typography>
                </Box>
                {dashboardData.inward.length > 0 ? (
                    dashboardData.inward.length > 9 ? (
                        <Box sx={scrollableChartBox}>
                            {/* Scrollable chart logic... */}
                        </Box>
                    ) : (
                        <Box>
                            {/* Responsive chart logic... */}
                        </Box>
                    )
                ) : (
                    <Typography variant="body2" color="text.secondary" align="center">No inward data</Typography>
                )}
            </Paper>
        </Grid>

        {/* ... The rest of your JSX for other cards (outward, low stock, etc.) ... */}
        {/* Make sure to pass the correct data, e.g., items={dashboardData.lowStock} */}

      </Grid>
    </Container>
  );
};

export default Dashboard;
