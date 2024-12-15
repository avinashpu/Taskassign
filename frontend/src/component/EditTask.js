import React, { useState, useEffect } from "react";
import "./EditTask.css";  
const EditTask = ({ isOpen, onClose, onEditTask, taskToEdit }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("1");
  const [status, setStatus] = useState("Pending");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setPriority(taskToEdit.priority);
      setStatus(taskToEdit.status);
      setStartTime(taskToEdit.startTime);
      setEndTime(taskToEdit.endTime);
    }
  }, [taskToEdit]);

  const handleEditTask = () => {
    if (title && startTime && endTime) {
      const updatedTask = {
        ...taskToEdit,
        title,
        priority,
        status,
        startTime,
        endTime,
        totalTime: calculateTotalTime(startTime, endTime),
      };
      onEditTask(updatedTask);
      onClose();
    } else {
      alert("Please fill out all required fields.");
    }
  };

  const calculateTotalTime = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffInMs = endDate - startDate;
    return diffInMs / (1000 * 60 * 60);
  };

  const toggleStatus = () => {
    setStatus(status === "Pending" ? "Finished" : "Pending");
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Edit Task</h2>
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
            <button
              className={`status-btn ${status === "Pending" ? "pending" : "finished"}`}
              onClick={toggleStatus}
            >
              {status}
            </button>
          </div>
        </div>
        <div className="form-group">
          <label>Start Time</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>End Time</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <div className="modal-actions">
          <button className="add-task-btn" onClick={handleEditTask}>Save changes</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
