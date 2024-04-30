import React, { useState , useEffect } from 'react';
import logo from '../assests/logotm.png';
import TaskCardContainer from './TaskCardContainer';
import '../App.css';
import TaskCountBars from './TaskCountBars';

function TaskFormPage() {
  const [showInputs, setShowInputs] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subtask, setSubtask] = useState('');
  const [subtasks, setSubtasks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('all');
  const [showSearchFilter, setShowSearchFilter] = useState(false);
  const [totalTaskCount, setTotalTaskCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [incompleteTaskCount, setIncompleteTaskCount] = useState(0);

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  
  useEffect(() => {
    setTotalTaskCount(tasks.length);
    setCompletedTaskCount(tasks.filter(task => task.completed).length);
    setIncompleteTaskCount(tasks.filter(task => !task.completed).length);
  }, [tasks]);
  


  const handleAddNewTask = () => {
    setShowInputs(!showInputs);
    setShowSearchFilter(true);
  };

  const handleAddSubtask = () => {
    if (subtask.trim() !== '') {
      setSubtasks([...subtasks, { id: generateId(), name: subtask, completed: false }]);
      setSubtask('');
    }
  };

  const handleSaveTask = () => {
    if (title.trim() === '') {
      setError('Title cannot be empty');
      return;
    }
    if (description.trim() === '') {
      setError('Description cannot be empty');
      return;
    }
    setError('');

    const newTask = {
      id: generateId(),
      title: title,
      description: description,
      subtasks: subtasks,
      completed: false
    };

    setTasks([...tasks, newTask]);

    setTitle('');
    setDescription('');
    setSubtasks([]);
    setShowInputs(false);
  };

  const handleCompleteTask = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: true };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleEditTask = (taskId, updatedTaskData) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, ...updatedTaskData };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleSubtaskToggle = (taskId, subtaskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const updatedSubtasks = task.subtasks.map(subtask => {
          if (subtask.id === subtaskId) {
            return { ...subtask, completed: !subtask.completed };
          }
          return subtask;
        });
        return { ...task, subtasks: updatedSubtasks };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault(); // Ensure preventDefault is called
    const droppedTaskId = 'dropped'; // Assuming 'dropped' is the ID of the drop target
    const draggedTaskId = e.dataTransfer.getData('taskId');
    if (draggedTaskId && draggedTaskId !== droppedTaskId) {
      const updatedTasks = tasks.map(task => {
        if (task.id === draggedTaskId) {
          return { ...task, id: droppedTaskId };
        } else if (task.id === droppedTaskId) {
          return { ...task, id: draggedTaskId };
        }
        return task;
      });
      setTasks(updatedTasks);
    }
  };
  

  // Apply search and filter to tasks
  const filteredTasks = tasks.filter(task => {
    if (filterOption === 'completed') {
      return task.completed;
    } else if (filterOption === 'incomplete') {
      return !task.completed;
    }
    return true; // For 'all' filter option, include all tasks
  }).filter(task => {
    return task.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="container">
      {/* Logo container */}
      <div className="logo-container">
        <img src={logo} alt="Task Manager Logo" className="tfplogo" />
        <h1 className="title">Task Manager</h1>
      </div>



       {/* Task counts */}
       <div className="task-count-bars">
        <div className="bar-label">Total:</div>
        <div className="total-bar" style={{ width: `${totalTaskCount}%` }}></div>
        <div className="count-label">{totalTaskCount}</div>
      </div>
      <div className="task-count-bars">
        <div className="bar-label">Completed:</div>
        <div className="completed-bar" style={{ width: `${completedTaskCount}%` }}></div>
        <div className="count-label">{completedTaskCount}</div>
      </div>
      <div className="task-count-bars">
        <div className="bar-label">Incomplete:</div>
        <div className="incomplete-bar" style={{ width: `${incompleteTaskCount}%` }}></div>
        <div className="count-label">{incompleteTaskCount}</div>
      </div>



      {/* Add new task button */}
      <div className="row">
        <div className="col-md-12">
          <div className="add-new-task-button-container">
            <button className="add-new-task-button" onClick={handleAddNewTask}>
              {showInputs ? 'Cancel' : 'Add New Task'}
            </button>
          </div>
        </div>
      </div>


      {/* Task form and task cards */}
      <div className="row">
        <div className="col-md-6">
          <div className="left-column">
            {showInputs && (
              <div className="input-container">
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              </div>
            )}
            {showInputs && (
              <div className="input-button">
                <input type="text" placeholder="Subtask" value={subtask} onChange={(e) => setSubtask(e.target.value)} />
                <button className="add-button" onClick={handleAddSubtask}>
                  Add Subtask
                </button>
              </div>
            )}
            {showInputs && (
              <div className="button-container">
                <button className="save-task-button" onClick={handleSaveTask}>Save Task</button>
                <button className="cancel-task-button" onClick={() => setShowInputs(false)}>Cancel</button>
              </div>
            )}
            {error && <div className="error">{error}</div>}
          </div>
        </div>
        <div className="col-md-6">
          <div className="right-column">

            
            {/* Search and filter section */}
            {showSearchFilter && tasks.length > 1 && (
              <div className="search-filter-section">
                <input
                  type="text"
                  placeholder="Search tasks"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <select value={filterOption} onChange={handleFilterChange}>
                  <option value="all">All</option>
                  <option value="completed">Completed</option>
                  <option value="incomplete">Incomplete</option>
                </select>
              </div>
            )}

            {/* Render TaskCardContainer only if there are tasks */}
            {tasks.length > 0 && (
              <TaskCardContainer
                tasks={filteredTasks} // Pass filtered tasks
                onComplete={handleCompleteTask}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
                onSubtaskToggle={handleSubtaskToggle}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'dropped')}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskFormPage;
