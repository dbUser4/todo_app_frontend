import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          "https://todo-app-backend.onrender.com/api/tasks",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTasks(res.data);
      } catch (err) {
        setMessage("Failed to load tasks ❌");
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://todo-app-backend.onrender.com/api/tasks",
        { title },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks([...tasks, res.data]);
      setTitle("");
      setMessage("Task added ✅");
    } catch (err) {
      setMessage("Failed to add task ❌");
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(
        `https://todo-app-backend.onrender.com/api/tasks/${taskId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks(tasks.filter((task) => task._id !== taskId));
      setMessage("Task deleted ✅");
    } catch (err) {
      setMessage("Failed to delete task ❌");
    }
  };

  const handleEdit = (task) => {
    setEditId(task._id);
    setEditTitle(task.title);
  };

  const handleUpdate = async (taskId) => {
    try {
      const res = await axios.put(
        `https://todo-app-backend.onrender.com/api/tasks/${taskId}`,
        { title: editTitle },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedTasks = tasks.map((task) =>
        task._id === taskId ? res.data : task
      );
      setTasks(updatedTasks);
      setEditId(null);
      setEditTitle("");
      setMessage("Task updated ✅");
    } catch (err) {
      setMessage("Failed to update task ❌");
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Dashboard</h2>
        <button onClick={handleLogout} className="btn btn-outline-danger">
          Logout
        </button>
      </div>

      <form onSubmit={handleAddTask} className="d-flex gap-2 mb-3">
        <input
          className="form-control"
          placeholder="Enter new task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>

      {message && <p className="text-info">{message}</p>}

      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {editId === task._id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="form-control me-2"
                />
                <button
                  onClick={() => handleUpdate(task._id)}
                  className="btn btn-success btn-sm me-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditId(null)}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{task.title}</span>
                <div>
                  <button
                    onClick={() => handleEdit(task)}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
