const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Получить все проекты
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Добавить новый проект
router.post('/', async (req, res) => {
  const project = new Project({
    name: req.body.name,
    category: req.body.category
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;