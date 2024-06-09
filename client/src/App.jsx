import React from 'react';
import { BrowserRouter as Router, Route,  Redirect, Routes } from 'react-router-dom';
import TodoList from './components/TodoList';
import Register from './components/Register';
import Login from './components/Login';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Пример проверки аутентификации

  return (
    <Router>
      <Routes>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/todos" render={() => (
          isAuthenticated ? <TodoList /> : <Redirect to="/login" />
        )} />
        <Redirect from="/" to={isAuthenticated ? "/todos" : "/login"} />
      </Routes>
    </Router>
  );
};

export default App;
