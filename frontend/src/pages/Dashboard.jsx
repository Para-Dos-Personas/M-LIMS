// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Grid, Paper,
  Box, Chip, Alert, CircularProgress
} from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer,
  CartesianGrid, Legend
} from 'recharts';
import InventoryIcon from '@mui/icons-material/Inventory';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningIcon from '@mui/icons-material/Warning';
import HistoryIcon from '@mui/icons-material/History';
import DangerousIcon from '@mui/icons-material/Dangerous';

import dashboardService from '../services/dashboardService';
import { useWarehouse } from '../contexts/WarehouseContext';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    inward: [], outward: [], lowStock: [], oldStock: [], expiredStock: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { selectedWarehouse, loading: warehouseLoading } = useWarehouse();

  const processChartData = (logs) => {
    if (!Array.isArray(logs)) return [];
    const grouped = logs.reduce((acc, log) => {
      const name = log.Component?.name || `Component ${log.componentId}`;
      acc[name] = (acc[name] || 0) + log.quantity;
      return acc;
    }, {});
    return Object.entries(grouped)
      .map(([component, quantity]) => ({ component, quantity }))
      .sort((a, b) => a.component.localeCompare(b.component));
  };

  const getLowStockSeverity = (qty, threshold) => {
    if (qty === 0) return 'error';
    if (qty <= Math.min(3, threshold * 0.3)) return 'warning';
    return 'info';
  };

  const getLowStockColor = (qty, threshold) => {
    if (qty === 0) return '#d32f2f';
    if (qty <= Math.min(3, threshold * 0.3)) return '#ed6c02';
    return '#1976d2';
  };

  const getLowStockLabel = (qty, threshold) => {
    if (qty === 0) return 'CRITICAL';
    if (qty <= Math.min(3, threshold * 0.3)) return 'WARNING';
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
    width: '100%', overflowX: 'auto', overflowY: 'hidden',
    scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' }
  };

  const chartStyles = {
    '& .recharts-bar-rectangle, & .recharts-bar-rectangle:hover, & .recharts-active-bar': {
      filter: 'none !important', opacity: '1 !important'
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedWarehouse) return;
      setLoading(true);
      setError(null);

      try {
        const warehouseId = selectedWarehouse.id === 'all' ? null : selectedWarehouse.id;
        const [
          inRes, outRes, lowRes, oldRes, expRes
        ] = await Promise.all([
          dashboardService.getInwardStats(null, warehouseId),
          dashboardService.getOutwardStats(null, warehouseId),
          dashboardService.getLowStock(warehouseId),
          dashboardService.getOldStock(warehouseId),
          dashboardService.getExpiredStock(warehouseId),
        ]);

        setDashboardData({
          inward: processChartData(inRes.logs),
          outward: processChartData(outRes.logs),
          lowStock: Array.isArray(lowRes) ? lowRes : [],
          oldStock: Array.isArray(oldRes) ? oldRes : [],
          expiredStock: Array.isArray(expRes) ? expRes : [],
        });
      } catch (err) {
        console.error('❌ Error fetching dashboard data:', err);
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    if (!warehouseLoading) {
      fetchData();
    }
  }, [selectedWarehouse, warehouseLoading]);

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
        {/* Inwarded Items */}
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
                  <Box sx={{ minWidth: `${dashboardData.inward.length * 80}px`, height: 250 }}>
                    <BarChart
                      width={dashboardData.inward.length * 80}
                      height={250}
                      data={dashboardData.inward}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="component"
                        angle={-30}
                        textAnchor="end"
                        interval={0}
                        height={60}
                      />
                      <YAxis allowDecimals={false} />
                      <Tooltip cursor={false} />
                      <Legend />
                      <Bar dataKey="quantity" fill="#1976d2" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </Box>
                </Box>
              ) : (
                <Box sx={chartStyles}>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={dashboardData.inward}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="component"
                        angle={-30}
                        textAnchor="end"
                        interval={0}
                        height={60}
                      />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="quantity" fill="#1976d2" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              )
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
            {dashboardData.outward.length > 0 ? (
              dashboardData.outward.length > 9 ? (
                <Box sx={scrollableChartBox}>
                  <Box sx={{ minWidth: `${dashboardData.outward.length * 80}px`, height: 250 }}>
                    <BarChart
                      width={dashboardData.outward.length * 80}
                      height={250}
                      data={dashboardData.outward}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="component"
                        angle={-30}
                        textAnchor="end"
                        interval={0}
                        height={60}
                      />
                      <YAxis allowDecimals={false} />
                      <Tooltip cursor={false} />
                      <Legend />
                      <Bar dataKey="quantity" fill="#ef5350" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </Box>
                </Box>
              ) : (
                <Box sx={chartStyles}>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={dashboardData.outward}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="component"
                        angle={-30}
                        textAnchor="end"
                        interval={0}
                        height={60}
                      />
                      <YAxis allowDecimals={false} />
                      <Tooltip cursor={false} />
                      <Legend />
                      <Bar dataKey="quantity" fill="#ef5350" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              )
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
                Critical Low Stock ({dashboardData.lowStock.length} items)
              </Typography>
            </Box>
            {dashboardData.lowStock.length === 0 ? (
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
                {dashboardData.lowStock.map(item => (
                  <Box
                    key={item.id}
                    sx={{ mb: 2, p: 2, bgcolor: 'rgba(255,255,255,0.7)', borderRadius: 2 }}
                  >
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="body1" fontWeight="medium">
                        {item.name}
                      </Typography>
                      <Chip
                        label={`${item.quantity}/${item.criticalThreshold} - ${getLowStockLabel(
                          item.quantity,
                          item.criticalThreshold
                        )}`}
                        color={getLowStockSeverity(
                          item.quantity,
                          item.criticalThreshold
                        )}
                        size="small"
                        sx={{
                          bgcolor: getLowStockColor(
                            item.quantity,
                            item.criticalThreshold
                          ),
                          color: 'white',
                          fontWeight: 'bold',
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
                Old Stock Items ({dashboardData.oldStock.length} items)
              </Typography>
            </Box>
            {dashboardData.oldStock.length === 0 ? (
              <Box textAlign="center" py={2}>
                <Typography variant="body2" color="text.secondary">
                  No old stock items found.
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Items older than 1 year from manufacture date are considered old stock.
                </Typography>
              </Box>
            ) : (
              <Box>
                {dashboardData.oldStock.map(item => (
                  <Box
                    key={item.id}
                    sx={{ mb: 2, p: 2, bgcolor: 'rgba(255,255,255,0.7)', borderRadius: 2 }}
                  >
                    <Typography variant="body1" fontWeight="medium" mb={1}>
                      {item.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Manufactured: {new Date(item.manufactureDate).toLocaleDateString()} | Qty: {item.quantity} | Location: {item.location}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Expired Stock */}
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={cardStyle('linear-gradient(135deg, #ff6b6b 0%, #ffa8a8 100%)')}>
            <Box display="flex" alignItems="center" mb={2}>
              <DangerousIcon sx={{ mr: 1, color: '#c62828' }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#b71c1c' }}>
                Expired Stock ({dashboardData.expiredStock.length} items)
              </Typography>
            </Box>
            {dashboardData.expiredStock.length === 0 ? (
              <Box textAlign="center" py={2}>
                <Typography variant="body2" color="text.secondary">
                  No expired items found.
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Items past their expiry date are considered expired stock.
                </Typography>
              </Box>
            ) : (
              <Box>
                {dashboardData.expiredStock.map(item => (
                  <Box
                    key={item.id}
                    sx={{
                      mb: 2,
                      p: 2,
                      bgcolor: 'rgba(255,255,255,0.8)',
                      borderRadius: 2,
                      border: '2px solid #ffcdd2'
                    }}
                  >
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="body1" fontWeight="medium" color="error.main">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" fontWeight="bold" color="error.main">
                        {item.quantity} units
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="error.dark">
                      Expired: {new Date(item.expiryDate).toLocaleDateString()} | Location: {item.location} | Part: {item.partNumber}
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