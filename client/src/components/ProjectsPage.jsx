import React, { useState, useEffect } from 'react';

const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({ name: '', status: 'Будущий Проект' });

    useEffect(() => {
        // Fetch projects from the database on component mount
        fetch('/api/projects')
            .then(response => response.json())
            .then(data => setProjects(data));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProject({ ...newProject, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Save new project to the database
        fetch('/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProject),
        })
        .then(response => response.json())
        .then(data => setProjects([...projects, data]));
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
                />
                <select
                    name="status"
                    value={newProject.status}
                    onChange={handleInputChange}
                >
                    <option value="Будущий Проект">Будущий Проект</option>
                    <option value="Выполняется">Выполняется</option>
                    <option value="Выполнено">Выполнено</option>
                </select>
                <button type="submit">Добавить проект</button>
            </form>
            <div className="projects-container">
                <div className="projects-column">
                    <h2>Будущие Проекты</h2>
                    {projects.filter(project => project.status === 'Будущий Проект').map(project => (
                        <div key={project.id}>{project.name}</div>
                    ))}
                </div>
                <div className="projects-column">
                    <h2>Выполняется</h2>
                    {projects.filter(project => project.status === 'Выполняется').map(project => (
                        <div key={project.id}>{project.name}</div>
                    ))}
                </div>
                <div className="projects-column">
                    <h2>Выполнено</h2>
                    {projects.filter(project => project.status === 'Выполнено').map(project => (
                        <div key={project.id}>{project.name}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;
