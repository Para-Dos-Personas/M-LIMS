require('dotenv').config();

const password = String(process.env.DB_PASSWORD); // Explicitly cast to string

module.exports = {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: password,
  DB_HOST: process.env.DB_HOST
};
