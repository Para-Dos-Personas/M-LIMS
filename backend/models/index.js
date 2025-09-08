// backend/models/index.js

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
require('dotenv').config();

const db = {};

// 1. Initialize Sequelize instance (supports full DATABASE_URL or individual env vars)
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
        ssl: { require: true, rejectUnauthorized: false }
      }
    })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || 'postgres'
      }
    );

// 2. Auto-load all model definitions in this folder (except index.js)
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// 3. Run .associate() on each model, if defined
Object.values(db)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(db));

// 4. Attach Sequelize instances to our `db` object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;