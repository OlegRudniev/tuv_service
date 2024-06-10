import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  category: { type: String, required: true, enum: ['upcoming', 'inProgress', 'completed'] }, // Добавлено поле категории
  createdAt: { type: Date, default: Date.now }, // Добавлено поле времени создания
  subtasks: [{ text: String, completed: Boolean }] // Добавлено поле подзадач
});

const Todo = mongoose.model('Todo', todoSchema);

export { Todo };
