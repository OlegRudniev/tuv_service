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
      <h1 className="text-xl">Todo App</h1>
      <nav>
        {user ? (
          <>
            <span className="mr-4">Welcome, {user.username}</span>
            <button onClick={handleLogout} className="mr-4 p-2 bg-red-500 rounded">Logout</button>
          </>
        ) : (
          <>
            <button onClick={handleLoginClick} className="mr-4 p-2 bg-blue-500 rounded">Login</button>
            <button onClick={handleRegisterClick} className="p-2 bg-green-500 rounded">Register</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
