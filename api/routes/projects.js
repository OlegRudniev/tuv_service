// api/routes/projects.js
import express from 'express';
import { getProjects, createProject, getProjectById, getTasksByProjectId, createTask, updateTask } from '../services/projectService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projects = await getProjects();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, status } = req.body;
    const newProject = await createProject(name, status);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await getProjectById(req.params.id);
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.get('/:id/tasks', async (req, res) => {
  try {
    const tasks = await getTasksByProjectId(req.params.id);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.post('/:id/tasks', async (req, res) => {
  try {
    const newTask = await createTask(req.params.id, req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.put('/tasks/:taskId', async (req, res) => {
  try {
    const updatedTask = await updateTask(req.params.taskId, req.body);
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

export default router;
