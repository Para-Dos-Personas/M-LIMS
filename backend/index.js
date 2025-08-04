const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const componentRoutes = require('./routes/componentRoutes');


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/components', componentRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("LIMS backend running!");
});

// Sync DB and start server
const PORT = process.env.PORT || 5000;
sequelize.sync({ force: true }).then(() => {

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
