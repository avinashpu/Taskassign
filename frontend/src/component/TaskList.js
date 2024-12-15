import React, { useState } from "react";
import Navbar from "./Navbar";
import AddTask from "./AddTask";
import EditTask from "./EditTask";  
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([
    { id: "T-00001", title: "Buy clothes", priority: 5, status: "Pending", startTime: "26-Nov-24 11:00 AM", endTime: "30-Nov-24 11:00 AM", totalTime: 96 },
    { id: "T-00002", title: "Finish code", priority: 2, status: "Finished", startTime: "25-Nov-24 09:05 AM", endTime: "25-Nov-24 03:15 PM", totalTime: 6.17 },
    { id: "T-00003", title: "Book travel tickets", priority: 4, status: "Pending", startTime: "19-Nov-24 10:00 PM", endTime: "20-Nov-24 11:00 PM", totalTime: 25 },
    { id: "T-00004", title: "Order groceries", priority: 3, status: "Finished", startTime: "14-Oct-24 10:30 AM", endTime: "16-Oct-24 10:30 PM", totalTime: 60 },
    { id: "T-00005", title: "Medical checkup", priority: 1, status: "Pending", startTime: "19-Nov-24 01:15 PM", endTime: "21-Dec-24 05:00 PM", totalTime: 51.75 },
  ]);
  
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null); 
  const [selectedTasks, setSelectedTasks] = useState(new Set()); 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleAddTask = (task) => {
    const newTask = { ...task, id: `T-${tasks.length + 1}` };
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (editedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === editedTask.id ? editedTask : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    return filterStatus === "All" || task.status === filterStatus;
  });

  const sortTasks = (a, b) => {
    if (sortOrder === "StartAsc") return new Date(a.startTime) - new Date(b.startTime);
    if (sortOrder === "StartDesc") return new Date(b.startTime) - new Date(a.startTime);
    if (sortOrder === "EndAsc") return new Date(a.endTime) - new Date(b.endTime);
    if (sortOrder === "EndDesc") return new Date(b.endTime) - new Date(a.endTime);
    return 0;
  };

  const toggleTaskSelection = (taskId) => {
    const updatedSelectedTasks = new Set(selectedTasks);
    if (updatedSelectedTasks.has(taskId)) {
      updatedSelectedTasks.delete(taskId);
    } else {
      updatedSelectedTasks.add(taskId);
    }
    setSelectedTasks(updatedSelectedTasks);
  };

  const openDeleteModal = () => {
    if (selectedTasks.size > 0) {
      setIsDeleteModalOpen(true);
    } else {
      alert("Please select tasks to delete.");
    }
  };

  const deleteSelectedTasks = () => {
    setTasks(tasks.filter(task => !selectedTasks.has(task.id)));
    setSelectedTasks(new Set()); 
    setIsDeleteModalOpen(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="tasklist-container">
      <Navbar />
      <div className="tasklist-header">
        <h1>Task List</h1>
      </div>

      <div className="tasklist-actions">
        <div className="action-buttons">
          <button className="add-task-btn" onClick={() => setIsAddModalOpen(true)}>+ Add task</button>
          <button className="delete-task-btn" onClick={openDeleteModal}>Delete selected</button>
        </div>
        <div className="filters">
          <div className="sort-dropdown">
            <label>Sort:</label>
            <select onChange={(e) => setSortOrder(e.target.value)}>
              <option value="">--Select--</option>
              <option value="StartAsc">Start time: ASC</option>
              <option value="StartDesc">Start time: DESC</option>
              <option value="EndAsc">End time: ASC</option>
              <option value="EndDesc">End time: DESC</option>
            </select>
          </div>
          <div className="filter-dropdown">
            <label>Status:</label>
            <select onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Finished">Finished</option>
            </select>
          </div>
        </div>
      </div>

      <table className="task-table">
        <thead>
          <tr>
            <th></th>
            <th>Task ID</th>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Total time to finish (hrs)</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.sort(sortTasks).map((task) => (
            <tr key={task.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedTasks.has(task.id)}
                  onChange={() => toggleTaskSelection(task.id)}
                />
              </td>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.priority}</td>
              <td>{task.status}</td>
              <td>{task.startTime}</td>
              <td>{task.endTime}</td>
              <td>{task.totalTime}</td>
              <td>
                <button
                  onClick={() => {
                    setTaskToEdit(task);
                    setIsEditModalOpen(true);
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddTask isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAddTask={handleAddTask} />
      <EditTask isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onEditTask={handleEditTask} taskToEdit={taskToEdit} />
   
      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete the following tasks?</p>
            <ul>
              {Array.from(selectedTasks).map((taskId) => {
                const task = tasks.find(t => t.id === taskId);
                return (
                  <li key={taskId}>{task?.title}</li>
                );
              })}
            </ul>
            <div className="modal-actions">
              <button onClick={deleteSelectedTasks}>Confirm</button>
              <button onClick={closeDeleteModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
