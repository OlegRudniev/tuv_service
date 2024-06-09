import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TodoList from './components/TodoList';
import Register from './components/Register';
import Login from './components/Login';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Пример проверки аутентификации

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todos" element={isAuthenticated ? <TodoList /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/todos" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
