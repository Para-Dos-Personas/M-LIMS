const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./config/db");

dotenv.config();
const app = express();

// Middleware to parse incoming JSON
app.use(cors());
app.use(express.json()); // This line is CRUCIAL

// Register routes
const componentRoutes = require('./routes/componentRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/components', componentRoutes);
app.use('/api/users', userRoutes);
app.use('/auth', userRoutes); // ✅ Now frontend calls to /auth/login and /auth/register will work!

// Test route
app.get("/", (req, res) => {
  res.send("LIMS backend running!");
});

// Sync DB and start server
const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});