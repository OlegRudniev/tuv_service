const Home = ({ user }) => {
  return (
    <div className="container mx-auto p-4">
      <h2>Добро пожаловать, {user ? user.username : 'Гость'}!</h2>
    </div>
  );
};
