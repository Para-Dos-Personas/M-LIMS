// index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const { seedSampleData } = require("./utils/seedData");
const notificationScheduler = require("./utils/notificationScheduler");

dotenv.config();
const app = express();

app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const componentRoutes    = require('./routes/componentRoutes');
const userRoutes         = require('./routes/userRoutes');
const dashboardRoutes    = require('./routes/dashboardRoutes');
const logRoutes          = require('./routes/logRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const warehouseRoutes    = require('./routes/warehouseRoutes');

app.use('/api/components', componentRoutes);
app.use('/api/users',      userRoutes);
app.use('/auth',           userRoutes);
app.use('/api/dashboard',  dashboardRoutes);
app.use('/api/logs',       logRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/warehouses', warehouseRoutes);

app.get("/", (req, res) => {
  res.send("LIMS backend running!");
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

if (process.env.NODE_ENV === 'development') {
  app.post("/seed", async (req, res) => {
    try {
      await seedSampleData();
      res.json({ message: "Sample data seeded successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Failed to seed data", details: error.message });
    }
  });
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const initializeApp = async () => {
  try {
    await sequelize.sync();
    console.log('Database connected successfully');

    if (process.env.NODE_ENV === 'production') {
      notificationScheduler.start();
    }
  } catch (err) {
    console.error('Database connection failed:', err);
  }
};

initializeApp();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Seed data: POST http://localhost:${PORT}/seed`);
});

module.exports = app;