import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Supabase/Postgres connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for Supabase external connections
  }
});

// Event listener for connected clients
pool.on('connect', () => {
  console.log('PostgreSQL database pool connected.');
});

// Event listener for errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle database client:', err.message);
});

export default pool;
