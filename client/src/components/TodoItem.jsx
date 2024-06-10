import React from 'react';

const TodoItem = ({ todo, handleToggleComplete, handleViewDetails, completed }) => (
  <li className={`p-2 border rounded ${completed ? 'bg-green-100' : 'bg-gray-100'}`}>
    <div className="flex justify-between items-center">
      <span className="text-black cursor-pointer" onClick={() => handleViewDetails(todo._id)}>{todo.text}</span>
      <button
        onClick={() => handleToggleComplete(todo._id)}
        className={`ml-4 px-2 py-1 rounded ${todo.completed ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
      >
        {todo.completed ? 'Completed' : 'Incomplete'}
      </button>
    </div>
  </li>
);

export default TodoItem;
