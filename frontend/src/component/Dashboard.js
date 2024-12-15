import React from "react";
import Navbar from "./Navbar"; 
import "./Dashboard.css";

function Dashboard() {
  const taskData = [
    { priority: 1, pending: 3, timeLapsed: 12, timeToFinish: 8 },
    { priority: 2, pending: 5, timeLapsed: 6, timeToFinish: 3 },
    { priority: 3, pending: 6, timeLapsed: 8, timeToFinish: 7 },
    { priority: 4, pending: 0, timeLapsed: 0, timeToFinish: 7 },
    { priority: 5, pending: 6, timeLapsed: 30, timeToFinish: 6 },
  ];

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-content">
        <h1 className="heading">Dashboard</h1>

        <div className="summary-section">
          <div className="summary-item">
            <span className="value">25</span>
            <span className="label">Total tasks</span>
          </div>
          <div className="summary-item">
            <span className="value">40%</span>
            <span className="label">Tasks completed</span>
          </div>
          <div className="summary-item">
            <span className="value">60%</span>
            <span className="label">Tasks pending</span>
          </div>
          <div className="summary-item">
            <span className="value">3.5 hrs</span>
            <span className="label">Average time per completed task</span>
          </div>
        </div>

        <h2 className="sub-heading">Pending task summary</h2>
        <div className="pending-summary">
          <div className="summary-item">
            <span className="value">15</span>
            <span className="label">Pending tasks</span>
          </div>
          <div className="summary-item">
            <span className="value">56 hrs</span>
            <span className="label">Total time lapsed</span>
          </div>
          <div className="summary-item">
            <span className="value">24 hrs</span>
            <span className="label">
              Total time to finish <em>estimated based on endtime</em>
            </span>
          </div>
        </div>

        <table className="task-table">
          <thead>
            <tr>
              <th>Task priority</th>
              <th>Pending tasks</th>
              <th>Time lapsed (hrs)</th>
              <th>Time to finish (hrs)</th>
            </tr>
          </thead>
          <tbody>
            {taskData.map((task, index) => (
              <tr key={index}>
                <td>{task.priority}</td>
                <td>{task.pending}</td>
                <td>{task.timeLapsed}</td>
                <td>{task.timeToFinish}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
