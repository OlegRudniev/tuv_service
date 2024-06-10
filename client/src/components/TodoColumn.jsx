import React from 'react';
import TodoItem from './TodoItem';

const TodoColumn = ({ title, todos, handleToggleComplete, completed }) => (
  <div className="w-1/3">
    <h2 className="text-xl font-bold mb-2">{title}</h2>
    <ul className="space-y-2">
      {todos.map(todo => (
        <TodoItem
          key={todo._id}
          todo={todo}
          handleToggleComplete={handleToggleComplete}
          completed={completed}
        />
      ))}
    </ul>
  </div>
);

export default TodoColumn;
