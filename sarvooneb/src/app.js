import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter from './routes/index.js';
import { errorHandler } from './shared/middleware/error.middleware.js';

// Resolve paths for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP Request Logger
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      let statusColor = '\x1b[32m'; // Green
      if (res.statusCode >= 300 && res.statusCode < 400) {
        statusColor = '\x1b[33m'; // Yellow
      } else if (res.statusCode >= 400) {
        statusColor = '\x1b[31m'; // Red
      }
      
      console.log(`\x1b[1m\x1b[35m[API Request]\x1b[0m ${req.method} ${req.originalUrl} - ${statusColor}${res.statusCode}\x1b[0m - \x1b[33m${duration}ms\x1b[0m`);
      if (req.method !== 'GET' && req.body && Object.keys(req.body).length > 0) {
        console.log(`\x1b[90m  └─ Body: ${JSON.stringify(req.body)}\x1b[0m`);
      }
    });
    next();
  });
}

// Static folder for file uploads (located at project root, one level up from src)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Mount Centralized API Routes under /api prefix
app.use('/api', apiRouter);

// Basic Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    message: 'Sarvo One API is running smoothly',
    timestamp: new Date().toISOString()
  });
});

// Root welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the Sarvo One Backend API');
});

// 404 handler
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Global Error Handler Middleware
app.use(errorHandler);

export default app;
