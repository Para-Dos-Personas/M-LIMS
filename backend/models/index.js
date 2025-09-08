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
    console.log(`Loading model file: ${file}`);
    try {
      const modelFunction = require(path.join(__dirname, file));
      console.log(`Model function type for ${file}:`, typeof modelFunction);
      
      if (typeof modelFunction !== 'function') {
        console.error(`ERROR: ${file} does not export a function!`);
        console.error(`It exports:`, modelFunction);
        throw new Error(`Model file ${file} must export a function`);
      }
      
      const model = modelFunction(sequelize, Sequelize.DataTypes);
      console.log(`Successfully loaded model: ${model.name}`);
      db[model.name] = model;
    } catch (error) {
      console.error(`Error loading ${file}:`, error.message);
      throw error;
    }
  });

// 3. Run .associate() on each model, if defined
Object.values(db)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => {
    console.log(`Running associations for: ${model.name}`);
    try {
      model.associate(db);
    } catch (error) {
      console.error(`Error in associations for ${model.name}:`, error.message);
      throw error;
    }
  });

// 4. Attach Sequelize instances to our `db` object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

console.log('All models loaded successfully:', Object.keys(db));

module.exports = db;