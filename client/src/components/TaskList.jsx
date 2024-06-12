import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskList = () => {
    const { projectId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ name: '', status: 'To Do' });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/projects/${projectId}/tasks`)
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Ошибка при получении задач:', error);
            });
    }, [projectId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_API_URL}/projects/${projectId}/tasks`, { ...newTask, projectId })
            .then(response => {
                setTasks([...tasks, response.data]);
                setNewTask({ name: '', status: 'To Do' });
            })
            .catch(error => {
                console.error('Ошибка при добавлении задачи:', error);
            });
    };

    const handleTaskClick = (taskId) => {
        navigate(`/tasks/${projectId}/task/${taskId}`);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Задачи проекта</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-2">
                    <input
                        type="text"
                        name="name"
                        value={newTask.name}
                        onChange={handleInputChange}
                        placeholder="Название задачи"
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-2">
                    <select
                        name="status"
                        value={newTask.status}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                    >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Добавить задачу</button>
            </form>
            <div className="tasks-container">
                {tasks.map(task => (
                    <div key={task._id} className="border p-2 mb-2 cursor-pointer" onClick={() => handleTaskClick(task._id)}>
                        <h2 className="text-xl">{task.name}</h2>
                        <p>{task.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList;
