import dotenv from 'dotenv';
import app from './app.js';
import pool from './config/database.js';
import { ensureDefaultData } from './config/seed.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, async () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  
  // Test database connection
  try {
    const res = await pool.query('SELECT NOW()');
    console.log(`Database connection test successful. Current time on DB: ${res.rows[0].now}`);
    
    // Seed default records if needed
    await ensureDefaultData();
  } catch (err) {
    console.error('Database connection test failed. Verify DATABASE_URL and password in .env.');
    console.error(`Error: ${err.message}`);
  }
});
