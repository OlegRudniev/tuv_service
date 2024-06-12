import React from 'react';


const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Welcome, {user ? user.username : 'Guest'}!</h1>
    </div>
  );
};

export default Home;

