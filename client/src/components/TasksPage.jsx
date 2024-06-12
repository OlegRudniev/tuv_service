// client/src/components/TasksPage.jsx
import React, { useEffect, useState } from 'react';
import { getTasksByProjectId, createTask } from '../services/taskService';

const TasksPage = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskStatus, setTaskStatus] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasksByProjectId(projectId);
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };
    fetchTasks();
  }, [projectId]);

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = await createTask(projectId, { name: taskName, status: taskStatus });
      setTasks([...tasks, newTask]);
      setTaskName('');
      setTaskStatus('');
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <div>
      <h1>Tasks</h1>
      <form onSubmit={handleTaskSubmit}>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task Name"
        />
        <input
          type="text"
          value={taskStatus}
          onChange={(e) => setTaskStatus(e.target.value)}
          placeholder="Task Status"
        />
        <button type="submit">Create Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;
