import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ user, handleLogout }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex items-center space-x-4">
        <img src="/path/to/logo.png" alt="Logo" className="h-10" />
        <h1 className="text-xl font-bold">TUV Service</h1>
        <nav>
          <Link to="/" className="hover:underline mr-4">Главная</Link>
          <Link to="/todos" className="hover:underline mr-4">Список задач</Link>
        </nav>
      </div>
      <div>
        {user ? (
          <>
            <span className="mr-4">Welcome, {user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={handleLoginClick} className="mr-4 p-2 bg-blue-500 rounded">Login</button>
            <button onClick={handleRegisterClick} className="p-2 bg-green-500 rounded">Register</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
