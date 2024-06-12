import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import ProjectsPage from './components/ProjectsPage';
import NotFound from './components/NotFound';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;

