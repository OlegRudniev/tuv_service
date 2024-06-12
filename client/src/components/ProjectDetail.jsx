// client/src/components/ProjectDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById, getTasksByProjectId, createTask } from '../services/projectService';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskStatus, setTaskStatus] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectById(id);
        setProject(data);
      } catch (error) {
        console.error('Failed to fetch project:', error);
      }
    };
    const fetchTasks = async () => {
      try {
        const data = await getTasksByProjectId(id);
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };
    fetchProject();
    fetchTasks();
  }, [id]);

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = await createTask(id, { name: taskName, status: taskStatus });
      setTasks([...tasks, newTask]);
      setTaskName('');
      setTaskStatus('');
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <div>
      {project && (
        <>
          <h1>{project.name}</h1>
          <p>Status: {project.status}</p>
        </>
      )}
      <h2>Tasks</h2>
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

export default ProjectDetail;
