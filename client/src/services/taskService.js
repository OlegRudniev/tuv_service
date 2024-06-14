// client/src/services/taskService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/projects';

export const getTasksByProjectId = async (projectId) => {
  const response = await axios.get(`${API_URL}/${projectId}/tasks`);
  return response.data;
};

export const createTask = async (projectId, taskData) => {
  const response = await axios.post(`${API_URL}/${projectId}/tasks`, taskData);
  return response.data;
};
