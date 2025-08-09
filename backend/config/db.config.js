require('dotenv').config();
const { URL } = require('url');

let DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT;

if (process.env.DATABASE_URL) {
  const parsed = new URL(process.env.DATABASE_URL);
  DB_NAME = parsed.pathname.slice(1); // removes the leading '/'
  DB_USER = parsed.username;
  DB_PASSWORD = decodeURIComponent(parsed.password);
  DB_HOST = parsed.hostname;
  DB_PORT = parsed.port || 5432;
} else {
  DB_NAME = process.env.DB_NAME;
  DB_USER = process.env.DB_USER;
  DB_PASSWORD = String(process.env.DB_PASSWORD);
  DB_HOST = process.env.DB_HOST;
  DB_PORT = process.env.DB_PORT || 5432;
}

module.exports = {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT
};
