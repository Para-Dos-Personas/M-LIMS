const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DATABASE_URL) {
  // Production / Render style (single connection string)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: process.env.NODE_ENV === 'production'
        ? { require: true, rejectUnauthorized: false }
        : false
    }
  });
} else {
  // Local dev (split env vars)
  const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}` +
    `@${process.env.DB_HOST}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME}`;

  sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    logging: false
  });
}

module.exports = sequelize;
