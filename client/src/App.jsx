import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Добавляем недостающие импорты
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import TodoList from './components/TodoList';
import TodoDetail from './components/TodoDetail';
import NotFound from './components/NotFound';

const App = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload(); // Обновляем страницу после выхода
  };

  return (
    <Router>
      <Header user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todos" element={<TodoList />} />
        <Route path="/todo/:id" element={<TodoDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
