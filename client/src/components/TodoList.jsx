import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserHeader from './UserHeader';
import TodoForm from './TodoForm';
import TodoColumn from './TodoColumn';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [category, setCategory] = useState('upcoming');
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
    const res = await axios.post('/api/todos', { text: newTodo, category }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTodos([...todos, res.data]);
    setNewTodo('');
    setCategory('upcoming');
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
        <UserHeader user={user} handleLogout={handleLogout} />
      )}
      <TodoForm
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        category={category}
        setCategory={setCategory}
        handleAddTodo={handleAddTodo}
      />
      <div className="flex space-x-4">
        <TodoColumn
          title="Upcoming Tasks"
          todos={todos.filter(todo => todo.category === 'upcoming')}
          handleToggleComplete={handleToggleComplete}
        />
        <TodoColumn
          title="In Progress"
          todos={todos.filter(todo => todo.category === 'inProgress')}
          handleToggleComplete={handleToggleComplete}
        />
        <TodoColumn
          title="Completed Tasks"
          todos={todos.filter(todo => todo.category === 'completed')}
          handleToggleComplete={handleToggleComplete}
          completed
        />
      </div>
    </div>
  );
};

export default TodoList;
