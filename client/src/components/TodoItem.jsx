import React, { useState } from 'react';

const TodoItem = ({ todo, handleToggleComplete, handleUpdateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);
  const [newStatus, setNewStatus] = useState(todo.category);
  const [newSubtasks, setNewSubtasks] = useState(todo.subtasks || []);

  const handleSave = () => {
    handleUpdateTodo(todo._id, { text: newText, category: newStatus, subtasks: newSubtasks });
    setIsEditing(false);
  };

  const handleAddSubtask = () => {
    setNewSubtasks([...newSubtasks, { text: '', completed: false }]);
  };

  const handleSubtaskChange = (index, value) => {
    const updatedSubtasks = [...newSubtasks];
    updatedSubtasks[index].text = value;
    setNewSubtasks(updatedSubtasks);
  };

  const handleSubtaskToggle = (index) => {
    const updatedSubtasks = [...newSubtasks];
    updatedSubtasks[index].completed = !updatedSubtasks[index].completed;
    setNewSubtasks(updatedSubtasks);
  };

  return (
    <li className={`p-2 border rounded ${todo.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="p-2 border rounded w-full"
          />
          <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="p-2 border rounded w-full">
            <option value="upcoming">Upcoming</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button onClick={handleAddSubtask} className="mt-2 p-2 bg-blue-500 text-white rounded">Add Subtask</button>
          {newSubtasks.map((subtask, index) => (
            <div key={index} className="flex items-center mt-2">
              <input
                type="text"
                value={subtask.text}
                onChange={(e) => handleSubtaskChange(index, e.target.value)}
                className="p-2 border rounded w-full"
              />
              <input
                type="checkbox"
                checked={subtask.completed}
                onChange={() => handleSubtaskToggle(index)}
                className="ml-2"
              />
            </div>
          ))}
          <button onClick={handleSave} className="mt-2 p-2 bg-green-500 text-white rounded">Save</button>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <span className="text-black">{todo.text}</span>
          <button onClick={() => setIsEditing(true)} className="ml-4 px-2 py-1 bg-blue-500 text-white rounded">Edit</button>
          <button onClick={() => handleToggleComplete(todo._id)} className={`ml-4 px-2 py-1 rounded ${todo.completed ? 'bg-green-500 text-white' : 'bg-gray-300'}`}>
            {todo.completed ? 'Completed' : 'Incomplete'}
          </button>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
