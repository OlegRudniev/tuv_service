import React from 'react';
import Header from './Header';

const Home = ({ user }) => {
  return (
    <div className="container mx-auto p-4">
      <Header user={user} handleLogout={() => {}} /> {/* Dummy handleLogout */}
      <h2>Добро пожаловать, {user ? user.name : 'Гость'}!</h2>
    </div>
  );
};

export default Home;
