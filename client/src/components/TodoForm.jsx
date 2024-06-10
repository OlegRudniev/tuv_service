import React from 'react';

const TodoForm = ({ newTodo, setNewTodo, category, setCategory, handleAddTodo }) => (
  <form onSubmit={handleAddTodo} className="flex mb-4 space-x-2">
    <input
      type="text"
      value={newTodo}
      onChange={(e) => setNewTodo(e.target.value)}
      placeholder="Add a new task"
      className="w-full p-2 border border-gray-300 rounded-l"
    />
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="p-2 border border-gray-300 rounded"
    >
      <option value="upcoming">Upcoming</option>
      <option value="inProgress">In Progress</option>
      <option value="completed">Completed</option>
    </select>
    <button
      type="submit"
      className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
    >
      Add
    </button>
  </form>
);

export default TodoForm;
