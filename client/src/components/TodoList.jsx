import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/todos`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(res.data);
    };

    fetchTodos();
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;
    const token = localStorage.getItem('token');
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/todos`, { text: newTodo, category }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTodos([...todos, res.data]);
    setNewTodo('');
    setCategory('upcoming');
  };

  const handleToggleComplete = async (id) => {
    const token = localStorage.getItem('token');
    const res = await axios.patch(`${import.meta.env.VITE_API_URL}/todos/${id}/toggle`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTodos(todos.map(todo => todo._id === id ? res.data : todo));
  };

  const handleUpdateTodo = async (id, updatedTodo) => {
    const token = localStorage.getItem('token');
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/todos/${id}`, updatedTodo, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTodos(todos.map(todo => todo._id === id ? res.data : todo));
  };

  const handleViewDetails = (id) => {
    navigate(`/todo/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
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
          handleUpdateTodo={handleUpdateTodo}
          handleViewDetails={handleViewDetails}
        />
        <TodoColumn
          title="In Progress"
          todos={todos.filter(todo => todo.category === 'inProgress')}
          handleToggleComplete={handleToggleComplete}
          handleUpdateTodo={handleUpdateTodo}
          handleViewDetails={handleViewDetails}
        />
        <TodoColumn
          title="Completed Tasks"
          todos={todos.filter(todo => todo.category === 'completed')}
          handleToggleComplete={handleToggleComplete}
          handleUpdateTodo={handleUpdateTodo}
          handleViewDetails={handleViewDetails}
          completed
        />
      </div>
    </div>
  );
};

export default TodoList;

        />
        <TodoColumn
          title="In Progress"
          todos={todos.filter(todo => todo.category === 'inProgress')}
          handleToggleComplete={handleToggleComplete}
          handleUpdateTodo={handleUpdateTodo}
          handleViewDetails={handleViewDetails}
        />
        <TodoColumn
          title="Completed Tasks"
          todos={todos.filter(todo => todo.category === 'completed')}
          handleToggleComplete={handleToggleComplete}
          handleUpdateTodo={handleUpdateTodo}
          handleViewDetails={handleViewDetails}
          completed
        />
      </div>
    </div>
  );
};

export default TodoList;
