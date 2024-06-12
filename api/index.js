import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import morgan from 'morgan';
import winston from 'winston';
import { createProxyMiddleware } from 'http-proxy-middleware';

import authRoutes from './routes/auth.js';
import projectsRouter from './routes/projects.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Настройка CORS с указанием домена
const corsOptions = {
  origin: 'https://tuv-service.vercel.app', // замените на ваш домен
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization'
};
app.use(cors(corsOptions)); // Разрешите CORS для всех запросов с указанием опций

app.use(express.json());

// Настройка morgan для логирования HTTP-запросов
app.use(morgan('combined'));

// Настройка winston для логирования ошибок
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('PORT:', process.env.PORT);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    logger.error('MongoDB connection error:', err);
  });

// Определение маршрутов API
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectsRouter);

// Прокси-запросы к React-разработческому серверу Vite
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

// Middleware для обработки ошибок
app.use((err, req, res, next) => {
  console.error('Error middleware:', err.stack); // Дополнительное логирование
  logger.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.use(errorHandler); // Добавьте middleware для обработки ошибок

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
