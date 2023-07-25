require('dotenv').config();

const pgp = require('pg-promise')();

const connectionConfig = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
};

const db = pgp(connectionConfig);

// Test the connection
db.one('SELECT 1 as test')
  .then((result) => {
    console.log('Connection to PostgreSQL successful:', result);
  })
  .catch((error) => {
    console.error('Error connecting to PostgreSQL:', error);
  });
