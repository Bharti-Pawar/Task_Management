import React from 'react';
import TaskCard from './TaskCard';
import '../App.css'

function TaskCardContainer({ tasks, onComplete, onDelete, onEdit, onSubtaskToggle, onDragStart, onDragOver, onDrop }) {
  

  return (
    <div>
      
      {/* Display task cards */}
      <div className="task-cards" onDragOver={onDragOver} onDrop={onDrop}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            taskData={task}
            onComplete={() => onComplete(task.id)}
            onDelete={() => onDelete(task.id)}
            onEdit={(updatedTaskData) => onEdit(task.id, updatedTaskData)}
            onSubtaskToggle={(subtaskId) => onSubtaskToggle(task.id, subtaskId)}
            onDragStart={(e) => onDragStart(e, task.id)}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e,task.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskCardContainer;
