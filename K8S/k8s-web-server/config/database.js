const pg = require('pg');
const { Pool } = pg;

const primaryConfig = new Pool({
  host: '10.100.204.181',//process.env.RDS_HOSTNAME,
  user: 'postgres',//process.env.RDS_USERNAME,
  database: 'postgres',//process.env.RDS_DB_NAME,
  password: 'i٢�]�',
  port: 5432,//process.env.RDS_PORT,
  max: 20,
});

module.exports = primaryConfig;