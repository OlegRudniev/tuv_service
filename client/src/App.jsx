import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TodoList from './components/TodoList';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import NotFound from './components/NotFound';
import Home from './components/Home';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem('token'); // Проверка аутентификации
    if (isAuthenticated) {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUser={setUser} />} /> {/* Передаем setUser в Login */}
        <Route path="/logout" element={<Logout />} />
        <Route path="/todos" element={user ? <TodoList user={user} /> : <Navigate to="/login" replace />} />
        <Route path="/" element={user ? <Home user={user} /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<NotFound />} /> {/* Перенаправление на страницу 404 для всех несуществующих маршрутов */}
      </Routes>
    </Router>
  );
};

export default App;
