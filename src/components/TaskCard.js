import React, { useState } from 'react';
import  '../App.css'

function TaskCard({ taskData, onComplete, onEdit, onDelete, onSubtaskToggle, onDragStart, onDragOver, onDrop }) {
  const { id, title: initialTitle, description: initialDescription, subtasks, completed } = taskData;
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); // State to control the visibility of the confirmation modal
  const [editedSubtasks, setEditedSubtasks] = useState(subtasks.map(subtask => ({ ...subtask })));


  const handleComplete = () => {
    onComplete(id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(id, { title, description });
    setIsEditing(false);
  };

  const handleDelete = (e) => {
    e.preventDefault(); // Prevent the default behavior of the browser
    setShowConfirmation(true); // Show the confirmation modal
  };

  const handleConfirmDelete = () => {
    onDelete(id);
    setShowConfirmation(false); // Close the confirmation modal after deletion
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false); // Close the confirmation modal without deletion
  };

  const handleSubtaskToggle = (subtaskId) => {
    const updatedSubtasks = editedSubtasks.map(subtask => {
      if (subtask.id === subtaskId) {
        return { ...subtask, completed: !subtask.completed };
      }
      return subtask;
    });
    setEditedSubtasks(updatedSubtasks);
  };

  return (
    <div
      className={`task-card ${completed ? 'completed' : ''}`}
      draggable="true"
      onDragStart={(e) => onDragStart(e, id)}
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e , id)}
    >
      <h2>
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
        ) : (
          title
        )}
      </h2>
      <p>
        {isEditing ? (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />
        ) : (
          description
        )}
      </p>
      <ul>
        {editedSubtasks.map(subtask => (
          <li key={subtask.id}>
            <input
              type="checkbox"
              checked={subtask.completed}
              onChange={() => handleSubtaskToggle(subtask.id)}
            />
            {isEditing ? (
              <input
                type="text"
                value={subtask.name}
                onChange={(e) => {
                  const updatedSubtasks = editedSubtasks.map(st => {
                    if (st.id === subtask.id) {
                      return { ...st, name: e.target.value };
                    }
                    return st;
                  });
                  setEditedSubtasks(updatedSubtasks);
                }}
                placeholder="Enter subtask"
              />
            ) : (
              <label>{subtask.name}</label>
            )}
          </li>
        ))}
      </ul>
      <div className="task-buttons">
        <button onClick={handleComplete} className="complete-button">
          {completed ? 'Completed' : 'Complete'}
        </button>
        {!completed && (
          <>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </>
        )}
        {isEditing && <button onClick={handleSave}>Save</button>}
      </div>
      {showConfirmation && (
        <div className="confirmation-modal">
          <p>Are you sure you want to delete this task?</p>
          <div className="confirmation-buttons">
            <button onClick={handleConfirmDelete}>Yes</button>
            <button onClick={handleCancelDelete}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskCard;
