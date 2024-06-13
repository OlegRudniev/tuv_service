// client/src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Используем хук useNavigate для перенаправления

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(username, password);
      console.log('User logged in:', data);
      
      // Сохранение токена и данных пользователя в localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.result));
      
      // Перенаправление на главную страницу после успешного входа
      navigate('/');
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
