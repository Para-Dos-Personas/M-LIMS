// index.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const { seedSampleData } = require('./utils/seedData');
const notificationScheduler = require('./utils/notificationScheduler');

const componentRoutes    = require('./routes/componentRoutes');
const userRoutes         = require('./routes/userRoutes');
const dashboardRoutes    = require('./routes/dashboardRoutes');
const logRoutes          = require('./routes/logRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const warehouseRoutes    = require('./routes/warehouseRoutes');

const app = express();

// CORS
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health & Root
app.get('/', (req, res) => res.send('LIMS backend running!'));
app.get('/health', (req, res) =>
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
);

// API Routes
app.use('/api/components',    componentRoutes);
app.use('/api/users',         userRoutes);
app.use('/auth',              userRoutes);
app.use('/api/dashboard',     dashboardRoutes);
app.use('/api/logs',          logRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/warehouses',    warehouseRoutes);

// Dev-only seed endpoint
if (process.env.NODE_ENV === 'development') {
  app.post('/seed', async (req, res) => {
    try {
      await seedSampleData();
      res.json({ message: 'Sample data seeded successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to seed data', details: error.message });
    }
  });
}

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

// Initialize DB & start server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('✅ Database connected and synced');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
      console.log(`🔍 Health check: http://localhost:${PORT}/health`);
      if (process.env.NODE_ENV === 'development') {
        console.log(`🧪 Seed data: POST http://localhost:${PORT}/seed`);
      }
    });

    if (process.env.NODE_ENV === 'production') {
      notificationScheduler.start();
    }
  } catch (err) {
    console.error('❌ Initialization failed:', err);
    process.exit(1);
  }
};

startServer();

module.exports = app;