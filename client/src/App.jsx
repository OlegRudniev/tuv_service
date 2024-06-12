import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import ProjectsPage from './components/ProjectsPage';
import TasksPage from './components/TasksPage'; // Импортируем новый компонент
import TaskList from './components/TaskList'; // Импортируем компонент TaskList

import NotFound from './components/NotFound';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/projects/*" element={<ProjectsPage />} />
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/tasks/:projectId" element={<TaskList />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
