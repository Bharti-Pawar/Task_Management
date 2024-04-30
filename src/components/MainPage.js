import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assests/logotm.png';
import '../App.css';

function MainPage() {
  return (
    <div className="main-page">
      <div className="logo-container">
        <img src={logo} alt="Task Manager Logo" className="logo" />
        <h1 className="title">Task Manager</h1>
      </div>
      <div className="button-container">
        <Link to="/task-form" className="get-started-button">
          Get Things Done
          <span className="tooltip">Start by adding a task</span>
        </Link>
      </div>
    </div>
  );
}

export default MainPage;
