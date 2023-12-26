import pg from 'pg';
import config from '../../../../utils/config.js';

const { Pool } = pg;

const testConfig = {
  host: config.db_test.host,
  port: config.db_test.port,
  user: config.db_test.user,
  password: config.db_test.password,
  database: config.db_test.name,
};

const pool = config.env.mode === 'test' ? new Pool(testConfig) : new Pool();

export default pool;
