import express from 'express';
import { Todo } from '../models/Todo.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

router.post('/', auth, async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
    category: req.body.category,
    userId: req.userId,
    subtasks: req.body.subtasks // Добавлено поле подзадач
  });
  await newTodo.save();
  res.json(newTodo);
});

router.put('/:id', auth, async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTodo);
});

router.delete('/:id', auth, async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Todo deleted' });
});

export default router;
