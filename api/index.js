import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import winston from 'winston';
import { createProxyMiddleware } from 'http-proxy-middleware';

import authRoutes from './routes/auth.js';
import projectsRouter from './routes/projects.js'; 
import errorHandler from './middleware/errorHandler.js';

const app = express();

const corsOptions = {
  origin: 'https://tuv-service.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(morgan('combined'));

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    logger.error('MongoDB connection error:', err);
  });

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectsRouter);

app.use(
  '/',
  createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true,
    ws: true,
    logLevel: 'debug',
    pathRewrite: {
      '^/': '/'
    },
  })
);

app.use((err, req, res, next) => {
  console.error('Error middleware:', err.stack);
  logger.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.use(errorHandler);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
