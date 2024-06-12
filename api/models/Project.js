import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['Будущий Проект', 'Выполняется', 'Выполнено'],
    },
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
