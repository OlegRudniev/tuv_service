import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/todos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(res.data);
    };

    fetchTodos();
    setUser(JSON.parse(localStorage.getItem('user'))); // Получение информации о пользователе из localStorage
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;
    const token = localStorage.getItem('token');
    const res = await axios.post('/api/todos', { text: newTodo }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTodos([...todos, res.data]);
    setNewTodo('');
  };

  const handleToggleComplete = async (id) => {
    const token = localStorage.getItem('token');
    const res = await axios.patch(`/api/todos/${id}/toggle`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTodos(todos.map(todo => todo._id === id ? res.data : todo));
  };

  return (
    <div className="container mx-auto p-4">
      {user && (
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Welcome, {user.username}!</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
      <form onSubmit={handleAddTodo} className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
          className="w-full p-2 border border-gray-300 rounded-l"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
        >
          Add
        </button>
      </form>
      <ul className="space-y-2">
        {todos.map(todo => (
          <li key={todo._id} className={`p-2 border rounded ${todo.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
            <div className="flex justify-between items-center">
              <span className="text-black">{todo.text}</span>
              <button
                onClick={() => handleToggleComplete(todo._id)}
                className={`ml-4 px-2 py-1 rounded ${todo.completed ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
              >
                {todo.completed ? 'Completed' : 'Incomplete'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
