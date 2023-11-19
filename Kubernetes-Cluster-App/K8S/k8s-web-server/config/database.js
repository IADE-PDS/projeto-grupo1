const pg = require('pg');

  const Pool = pg.Pool
  const pool = new Pool({
      host: process.env.RDS_HOSTNAME,
      user: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      database: process.env.RDS_DB_NAME,
      port: process.env.RDS_PORT,
      max: 20});
  
module.exports = pool;

