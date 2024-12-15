import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './component/HomePage';
import Dashboard from './component/Dashboard';  
import TaskList from './component/TaskList';





function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasklist" element={<TaskList/>} />
      </Routes>
    </Router>
  );
}

export default App;
