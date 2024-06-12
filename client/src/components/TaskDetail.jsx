import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Используем useParams для получения параметров из URL

const TaskDetail = () => {
  const { taskId } = useParams(); // Получаем taskId из URL параметров
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/tasks/${taskId}`);
        setTask(response.data);
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      }
    };

    if (taskId) {
      fetchTask();
    }
  }, [taskId]);

  if (error) {
    return <div>Ошибка при получении задачи: {error}</div>;
  }

  if (!task) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <h1>{task.name}</h1>
      <p>Статус: {task.status}</p>
      <p>Начало: {new Date(task.startTime).toLocaleString()}</p>
      <p>Конец: {new Date(task.endTime).toLocaleString()}</p>
      <p>Заметки: {task.notes}</p>
    </div>
  );
};

export default TaskDetail;
