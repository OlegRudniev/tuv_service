import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TaskDetail = () => {
    const { projectId, taskId } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`)
            .then(response => {
                setTask(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Ошибка при получении задачи:', error);
                setError('Ошибка при получении задачи');
                setLoading(false);
            });
    }, [taskId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, task)
            .then(response => {
                setTask(response.data);
            })
            .catch(error => {
                console.error('Ошибка при обновлении задачи:', error);
            });
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Детали задачи</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <input
                        type="text"
                        name="name"
                        value={task.name}
                        onChange={handleInputChange}
                        placeholder="Название задачи"
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-2">
                    <input
                        type="datetime-local"
                        name="startTime"
                        value={task.startTime ? new Date(task.startTime).toISOString().slice(0, 16) : ''}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-2">
                    <input
                        type="datetime-local"
                        name="endTime"
                        value={task.endTime ? new Date(task.endTime).toISOString().slice(0, 16) : ''}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-2">
                    <textarea
                        name="notes"
                        value={task.notes || ''}
                        onChange={handleInputChange}
                        placeholder="Заметки"
                        className="border p-2 w-full"
                    ></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Сохранить</button>
            </form>
        </div>
    );
};

export default TaskDetail;
