// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={Register} />
          <Route path="/projects/:id" component={ProjectDetail} />
          <Route path="/projects" component={ProjectsPage} />
          <Route path="/tasks" component={TasksPage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
