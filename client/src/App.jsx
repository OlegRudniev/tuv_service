import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TodoList from './components/TodoList';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import NotFound from './components/NotFound';
import Header from './components/Header';
import Home from './components/Home';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Проверка аутентификации
  const user = isAuthenticated ? JSON.parse(localStorage.getItem('user')) : null;

  // Логирование значений для проверки
  console.log("User:", user);
  console.log("isAuthenticated:", isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/todos" element={isAuthenticated ? <TodoList /> : <Navigate to="/login" replace />} />
        <Route path="/" element={isAuthenticated ? <Home user={user} /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<NotFound />} /> {/* Перенаправление на страницу 404 для всех несуществующих маршрутов */}
      </Routes>
    </Router>
  );
};

export default App;
