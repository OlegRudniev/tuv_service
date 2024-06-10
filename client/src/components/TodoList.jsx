import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);

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

  return (
    <div className="container mx-auto p-4">
      {user && <h1 className="text-2xl font-bold mb-4">Welcome, {user.username}!</h1>}
      <ul className="space-y-2">
        {todos.map(todo => (
          <li key={todo._id} className="p-2 border rounded bg-gray-100">
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
