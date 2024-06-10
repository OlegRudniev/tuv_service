import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TodoDetail = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [newSubtask, setNewSubtask] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodo(res.data);
    };

    fetchTodo();
  }, [id]);

  const handleAddSubtask = async () => {
    if (newSubtask.trim() === '') return;
    const updatedSubtasks = [...todo.subtasks, { text: newSubtask, completed: false }];
    await updateTodo({ subtasks: updatedSubtasks });
    setNewSubtask('');
  };

  const handleToggleSubtask = async (index) => {
    const updatedSubtasks = [...todo.subtasks];
    updatedSubtasks[index].completed = !updatedSubtasks[index].completed;
    await updateTodo({ subtasks: updatedSubtasks });
  };

  const handleStatusChange = async (e) => {
    await updateTodo({ category: e.target.value });
  };

  const updateTodo = async (updatedFields) => {
    const token = localStorage.getItem('token');
    const res = await axios.put(`/api/todos/${id}`, { ...todo, ...updatedFields }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTodo(res.data);
  };

  if (!todo) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{todo.text}</h1>
      <p>Created At: {new Date(todo.createdAt).toLocaleString()}</p>
      <div>
        <label>Status:</label>
        <select value={todo.category} onChange={handleStatusChange} className="p-2 border rounded w-full">
          <option value="upcoming">Upcoming</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold">Subtasks</h2>
        <ul>
          {todo.subtasks.map((subtask, index) => (
            <li key={index} className="flex items-center">
              <input
                type="checkbox"
                checked={subtask.completed}
                onChange={() => handleToggleSubtask(index)}
                className="mr-2"
              />
              <span>{subtask.text}</span>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex">
          <input
            type="text"
            value={newSubtask}
            onChange={(e) => setNewSubtask(e.target.value)}
            className="p-2 border rounded w-full"
            placeholder="New subtask"
          />
          <button onClick={handleAddSubtask} className="ml-2 p-2 bg-blue-500 text-white rounded">Add</button>
        </div>
      </div>
      <button onClick={() => navigate(-1)} className="mt-4 p-2 bg-gray-500 text-white rounded">Back</button>
    </div>
  );
};

export default TodoDetail;
