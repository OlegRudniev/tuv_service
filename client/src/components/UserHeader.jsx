import React from 'react';

const UserHeader = ({ user, handleLogout }) => (
  <div className="flex justify-between items-center mb-4">
    <h1 className="text-2xl font-bold">Welcome, {user.username}!</h1>
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Logout
    </button>
  </div>
);

export default UserHeader;
