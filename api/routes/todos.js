import express from 'express';
import { Todo } from '../models/Todo.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

router.get('/:id', auth, async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  res.json(todo);
});

router.post('/', auth, async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
    category: req.body.category,
    subtasks: req.body.subtasks,
    userId: req.userId
  });
  await newTodo.save();
  res.json(newTodo);
});

router.put('/:id', auth, async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTodo);
});

router.patch('/:id/toggle', auth, async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
});

router.delete('/:id', auth, async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Todo deleted' });
});

export default router;
