// api/services/projectService.js
import Project from '../models/Project.js';
import Task from '../models/Task.js';

export const getProjects = async () => {
  return await Project.find();
};

export const createProject = async (name, status) => {
  const newProject = new Project({ name, status });
  await newProject.save();
  return newProject;
};

export const getProjectById = async (id) => {
  const project = await Project.findById(id);
  if (!project) throw new Error('Project not found');
  return project;
};

export const getTasksByProjectId = async (projectId) => {
  return await Task.find({ projectId });
};

export const createTask = async (projectId, taskData) => {
  const newTask = new Task({ ...taskData, projectId });
  await newTask.save();
  return newTask;
};

export const updateTask = async (taskId, taskData) => {
  const updatedTask = await Task.findByIdAndUpdate(taskId, taskData, { new: true });
  if (!updatedTask) throw new Error('Task not found');
  return updatedTask;
};
