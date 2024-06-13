// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Используем Routes
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import NotFound from './components/NotFound';
import ProjectDetail from './components/ProjectDetail';
import ProjectsPage from './components/ProjectsPage';
import Register from './components/Register';
import TasksPage from './components/TasksPage';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
