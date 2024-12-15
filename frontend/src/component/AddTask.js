import React, { useState, useEffect } from 'react';
import './AddTask.css';

const AddTask = ({ isOpen, onClose, onAddTask }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('1');
  const [status, setStatus] = useState('Pending');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

 
  const calculateTotalTime = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffInMs = endDate - startDate;
    return diffInMs / (1000 * 60 * 60); 
  };

  const handleAddTask = () => {
    if (title && startTime && endTime) {
   
      const totalTime = calculateTotalTime(startTime, endTime);
     
      onAddTask({ title, priority, status, startTime, endTime, totalTime });
      onClose();
    } else {
      alert('Please fill out all required fields.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Add new task</h2>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
          />
        </div>
        <div className="form-group">
          <label>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="form-group">
          <label>Status</label>
          <div className="status-toggle">
            <label>
              <input
                type="radio"
                name="status"
                value="Pending"
                checked={status === 'Pending'}
                onChange={(e) => setStatus(e.target.value)}
              />
              Pending
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="Finished"
                checked={status === 'Finished'}
                onChange={(e) => setStatus(e.target.value)}
              />
              Finished
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Start time</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>End time</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <div className="modal-actions">
          <button className="add-task-btn" onClick={handleAddTask}>Add task</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
