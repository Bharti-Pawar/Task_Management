import React from 'react';

const TaskCountBars = ({ totalTaskCount, completedTaskCount, incompleteTaskCount }) => {
  const totalPercentage = (totalTaskCount > 0) ? (totalTaskCount / totalTaskCount) * 100 : 0;
  const completedPercentage = (totalTaskCount > 0) ? (completedTaskCount / totalTaskCount) * 100 : 0;
  const incompletePercentage = (totalTaskCount > 0) ? (incompleteTaskCount / totalTaskCount) * 100 : 0;

  return (
    <div className="task-count-bars">
      <div className="bar total-bar" style={{ width: `${totalPercentage}%` }}></div>
      <div className="bar completed-bar" style={{ width: `${completedPercentage}%` }}></div>
      <div className="bar incomplete-bar" style={{ width: `${incompletePercentage}%` }}></div>
    </div>
  );
}

export default TaskCountBars;
