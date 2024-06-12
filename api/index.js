import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import projectsRouter from './routes/projects.js'; // Импортируем маршруты проектов

import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(cors());  // Разрешите CORS для всех запросов
app.use(express.json());

console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('PORT:', process.env.PORT);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectsRouter); // Используем маршруты проектов

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.use(errorHandler); // Добавьте middleware для обработки ошибок

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
