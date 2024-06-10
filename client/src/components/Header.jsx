import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ user, handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex items-center space-x-4">
        <img src="/path/to/logo.png" alt="Logo" className="h-10" />
        <h1 className="text-xl font-bold">TUV Service</h1>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span>{user.name}</span> {/* Отображение имени пользователя */}
            <button
              onClick={handleLogoutClick}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="space-x-4">
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
