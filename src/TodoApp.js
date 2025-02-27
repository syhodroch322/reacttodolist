import React, { useState } from "react";
import "./styles.css";

function TodoApp() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editInput, setEditInput] = useState("");

  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, input]);
      setInput("");
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((tasks, i) => i !== index);
    setTasks(newTasks);
  };

  const startEditing = (index) => {
    setIsEditing(index);
    setEditInput(tasks[index]);
  };

  const saveEdit = (index) => {
    if (editInput.trim() === "") return;
    const updatedTasks = tasks.map((task, i) =>
      i === index ? editInput : task
    );
    setTasks(updatedTasks);
    setIsEditing(null);
    setEditInput("");
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setEditInput("");
  };

  return (
    <div>
      <h2>To-Do List</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Введите задачу..."
      />
      <button onClick={addTask}>Добавить</button>

      <ul>
        {tasks.map((tasks, index) => (
          <li key={index}>
            {isEditing === index ? (
              <>
                <input
                  type="text"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
                <button onClick={() => saveEdit(index)}>Сохранить</button>
              </>
            ) : (
              <>
                {tasks}
                <button onClick={() => startEditing(index)}>
                  Редактировать
                </button>
              </>
            )}
            <button onClick={() => deleteTask(index)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
