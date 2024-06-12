import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TasksPage = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/projects`)
      .then(response => {
        if (Array.isArray(response.data)) {
          setProjects(response.data);
        } else {
          throw new Error('Unexpected response format');
        }
      })
      .catch(error => {
        console.error('Ошибка при получении проектов:', error);
        setError('Ошибка при получении проектов');
      });
  }, []);

  const handleProjectClick = (id) => {
    navigate(`/tasks/${id}`);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Выберите проект</h1>
      <div className="projects-container grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map(project => (
          <div
            key={project._id}
            className="border p-2 mb-2 cursor-pointer"
            onClick={() => handleProjectClick(project._id)}
          >
            {project.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksPage;
