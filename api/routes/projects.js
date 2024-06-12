import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

// Получить все проекты
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Добавить новый проект
router.post('/', async (req, res) => {
  try {
    const { name, status } = req.body;
    const newProject = new Project({ name, status });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

export default router;
