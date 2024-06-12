import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Выполнены', 'Выполняются', 'Будущие проекты'], required: true },
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
