import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TodoList from './components/TodoList';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import NotFound from './components/NotFound';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Проверка аутентификации

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/todos" element={isAuthenticated ? <TodoList /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/todos" : "/login"} />} />
        <Route path="*" element={<NotFound />} /> {/* Перенаправление на страницу 404 для всех несуществующих маршрутов */}
      </Routes>
    </Router>
  );
};

export default App;
