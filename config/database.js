const pg = require('pg');

  const Pool = pg.Pool
  const pool = new Pool({
      host: process.env.DB_HOST,
      user: "postgres",
      password: "lesliana",
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      max: 20});
  
module.exports = pool;

