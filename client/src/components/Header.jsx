
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';




const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); // Получение информации о пользователе из localStorage

  const handleLogout = () => {
    localStorage.removeItem('token'); // Удаление токена
    localStorage.removeItem('user'); // Удаление информации о пользователе
    navigate('/login'); // Перенаправление на страницу авторизации
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex items-center space-x-4">
        <img src="#" alt="Logo" className="h-10" />
        <h1 className="text-xl font-bold">TUV Service</h1>
        <nav>
          <Link to="/home" className="hover:underline mr-4">Главная</Link>
          <Link to="/projects" className="hover:underline mr-4">Проекты</Link>
          <Link to="/todos" className="hover:underline mr-4">Задачи</Link>
          <Link to="/mail" className="hover:underline mr-4">Почта</Link>
          <Link to="/chat" className="hover:underline mr-4">Чат</Link>
        </nav>
      </div>
      <div>
        {user ? (
          <>
            <span className="mr-4">Добро пожаловать, {user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Выход
            </button>
          </>
        ) : (
          <>
            <button onClick={handleLoginClick} className="mr-4 p-2 bg-blue-500 rounded">Вход</button>
            <button onClick={handleRegisterClick} className="p-2 bg-green-500 rounded">Регистрация</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;



