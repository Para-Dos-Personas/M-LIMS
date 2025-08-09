const { Sequelize } = require('sequelize');
require('dotenv').config();

const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}` +
  `@${process.env.DB_HOST}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME}`;

const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    // Uncomment the below if you ever deploy to a host that requires SSL
    // ssl: {
    //   require: true,
    //   rejectUnauthorized: false,
    // },
  },
});

module.exports = sequelize;