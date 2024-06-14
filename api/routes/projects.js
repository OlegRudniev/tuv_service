import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

// Определите свои маршруты для проектов здесь
// Пример: Получить все проекты
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

export default router;
