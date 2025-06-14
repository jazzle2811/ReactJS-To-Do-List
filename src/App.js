import { useEffect, useState } from "react";
import "./App.css";
import "font-awesome/css/font-awesome.min.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  const [taskInput, setTaskInput] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tasks"));
    if (stored) setTasks(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const name = taskInput.trim();
    if (!name) return;

    const newTask = {
      id: Date.now(),
      name,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setTaskInput("");
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearAll = () => {
    setTasks([]);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div>
      <div className="heading">
        <h1>React To-Do List</h1>
      </div>
      <div className="wrapper">
        <div className="task-input">
          <i className="fa fa-server" />
          <input
            type="text"
            placeholder="New task"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <i className="fa fa-floppy-o" onClick={addTask} />
        </div>

        <div className="controls">
          <div className="filters">
            {["all", "active", "completed"].map((type) => (
              <span
                key={type}
                className={filter === type ? "active" : ""}
                onClick={() => setFilter(type)}
              >
                {type[0].toUpperCase() + type.slice(1)}
              </span>
            ))}
          </div>
          <button className="clear-btn" onClick={clearAll}>
            Clear All
          </button>
        </div>

        <ul className="task-box">
          {filteredTasks.map((task) => (
            <li className="task" key={task.id}>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />
                <p className={task.completed ? "checked" : ""}>{task.name}</p>
              </label>
              <div className="settings">
                <i
                  className="fa fa-trash"
                  onClick={() => deleteTask(task.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
