import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['To Do', 'In Progress', 'Done'],
  },
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
  notes: {
    type: String,
  },
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
