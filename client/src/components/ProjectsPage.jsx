import React, { useState, useEffect } from 'react';

const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({ name: '', status: 'Будущий Проект' });

    useEffect(() => {
        // Fetch projects from the database on component mount
        fetch('/api/projects')
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.error('Ошибка при получении проектов:', error));
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
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => setProjects([...projects, data]))
        .catch(error => console.error('Ошибка при добавлении проекта:', error));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Проекты</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-2">
                    <input
                        type="text"
                        name="name"
                        value={newProject.name}
                        onChange={handleInputChange}
                        placeholder="Название проекта"
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-2">
                    <select
                        name="status"
                        value={newProject.status}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                    >
                        <option value="Будущий Проект">Будущий Проект</option>
                        <option value="Выполняется">Выполняется</option>
                        <option value="Выполнено">Выполнено</option>
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Добавить проект</button>
            </form>
            <div className="projects-container grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="projects-column">
                    <h2 className="text-xl font-semibold mb-2">Будущие Проекты</h2>
                    {projects.filter(project => project.status === 'Будущий Проект').map(project => (
                        <div key={project.id} className="border p-2 mb-2">{project.name}</div>
                    ))}
                </div>
                <div className="projects-column">
                    <h2 className="text-xl font-semibold mb-2">Выполняется</h2>
                    {projects.filter(project => project.status === 'Выполняется').map(project => (
                        <div key={project.id} className="border p-2 mb-2">{project.name}</div>
                    ))}
                </div>
                <div className="projects-column">
                    <h2 className="text-xl font-semibold mb-2">Выполнено</h2>
                    {projects.filter(project => project.status === 'Выполнено').map(project => (
                        <div key={project.id} className="border p-2 mb-2">{project.name}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;

