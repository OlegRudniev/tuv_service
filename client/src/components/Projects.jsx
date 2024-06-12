import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', category: 'Будущие проекты' });

  useEffect(() => {
    // Fetch projects from the backend
    axios.get('/api/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/projects', newProject)
      .then(response => {
        setProjects([...projects, response.data]);
        setNewProject({ name: '', category: 'Будущие проекты' });
      })
      .catch(error => console.error('Error adding project:', error));
  };

  return (
    <div>
      <h1>Проекты</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newProject.name}
          onChange={handleInputChange}
          placeholder="Название проекта"
          required
        />
        <select name="category" value={newProject.category} onChange={handleInputChange}>
          <option value="Будущие проекты">Будущие проекты</option>
          <option value="Выполняются">Выполняются</option>
          <option value="Выполнены">Выполнены</option>
        </select>
        <button type="submit">Добавить проект</button>
      </form>
      <div>
        <h2>Будущие проекты</h2>
        {projects.filter(project => project.category === 'Будущие проекты').map(project => (
          <div key={project.id}>{project.name}</div>
        ))}
        <h2>Выполняются</h2>
        {projects.filter(project => project.category === 'Выполняются').map(project => (
          <div key={project.id}>{project.name}</div>
        ))}
        <h2>Выполнены</h2>
        {projects.filter(project => project.category === 'Выполнены').map(project => (
          <div key={project.id}>{project.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Projects;