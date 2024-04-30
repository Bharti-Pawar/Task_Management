// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import TaskFormPage from './components/TaskFormPage';
import TaskCard from './components/TaskCard';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/task-form" element={<TaskFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
