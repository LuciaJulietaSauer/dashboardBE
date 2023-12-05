import { createPool } from 'mysql2/promise';

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: 'rootMySql',
  port: 3306,
  database: 'Dashboard_DB'
});

export default pool;
