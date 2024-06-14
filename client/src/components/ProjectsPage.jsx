// client/src/components/ProjectsPage.jsx
import React, { useEffect, useState } from 'react';
import { getProjects, createProject } from '../services/projectService';
import { Link } from 'react-router-dom';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProject = await createProject({ name, status });
      setProjects([...projects, newProject]);
      setName('');
      setStatus('');
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  return (
    <div>
      <h1>Projects</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project Name"
        />
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="Project Status"
        />
        <button type="submit">Create Project</button>
      </form>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <Link to={`/projects/${project._id}`}>{project.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsPage;
