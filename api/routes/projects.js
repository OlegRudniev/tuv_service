import express from 'express';
import Project from '../models/Project.js';
import Task from '../models/Task.js';

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

// Получить проект по ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Проект не найден' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Получить задачи проекта по ID проекта
router.get('/:id/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Добавить новую задачу к проекту
router.post('/:id/tasks', async (req, res) => {
  try {
    const { name, status, projectId } = req.body;
    const newTask = new Task({ name, status, projectId });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Получить задачу по ID
router.get('/tasks/:taskId', async (req, res) => {
  try {
    console.log(`Получение задачи с ID: ${req.params.taskId}`);
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      console.log('Задача не найдена');
      return res.status(404).json({ message: 'Задача не найдена' });
    }
    res.json(task);
  } catch (error) {
    console.error('Ошибка при получении задачи:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Обновить задачу
router.get('/tasks/:taskId', async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: 'Задача не найдена' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});



export default router;
