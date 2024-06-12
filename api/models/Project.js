const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Выполнены', 'Выполняются', 'Будущие проекты'], required: true },
});

module.exports = mongoose.model('Project', projectSchema);