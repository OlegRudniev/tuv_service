// client/src/services/projectService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/projects';

export const getProjects = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createProject = async (projectData) => {
  const response = await axios.post(API_URL, projectData);
  return response.data;
};

export const getProjectById = async (projectId) => {
  const response = await axios.get(`${API_URL}/${projectId}`);
  return response.data;
};

export const getTasksByProjectId = async (projectId) => {
  const response = await axios.get(`${API_URL}/${projectId}/tasks`);
  return response.data;
};

export const createTask = async (projectId, taskData) => {
  const response = await axios.post(`${API_URL}/${projectId}/tasks`, taskData);
  return response.data;
};

// Другие запросы, связанные с проектами
