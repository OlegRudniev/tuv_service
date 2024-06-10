import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  category: { type: String, required: true, enum: ['upcoming', 'inProgress', 'completed'] },
  createdAt: { type: Date, default: Date.now },
  subtasks: [{ text: String, completed: Boolean }]
});

const Todo = mongoose.model('Todo', todoSchema);

export { Todo };
