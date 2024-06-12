import React from 'react';
import UserHeader from './UserHeader';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="container mx-auto p-4">
      <UserHeader user={user} />
      <h1 className="text-2xl font-bold">Welcome, {user ? user.username : 'Guest'}!</h1>
    </div>
  );
};

export default Home;

