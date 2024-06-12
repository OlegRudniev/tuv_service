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
    console.error('Error fetching projects:', error);
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
    console.error('Error adding project:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Получить проект по ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      console.error('Project not found:', req.params.id);
      return res.status(404).json({ message: 'Проект не найден' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Получить задачи проекта по ID проекта
router.get('/:id/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.id });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Добавить новую задачу к проекту
router.post('/:id/tasks', async (req, res) => {
  try {
    const { name, status, startTime, endTime, notes } = req.body;
    const newTask = new Task({ name, status, projectId: req.params.id, startTime, endTime, notes });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Получить задачу по ID
router.get('/tasks/:taskId', async (req, res) => {
  try {
    console.log('Fetching task with ID:', req.params.taskId); // Дополнительное логирование
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      console.error('Task not found:', req.params.taskId);
      return res.status(404).json({ message: 'Задача не найдена' });
    }
    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    console.error('Error details:', error.stack); // Дополнительное логирование
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Обновить задачу
router.put('/tasks/:taskId', async (req, res) => {
  try {
    const { name, startTime, endTime, notes, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      { name, startTime, endTime, notes, status },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

export default router;
