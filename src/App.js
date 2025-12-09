import React, { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todo, setTodo] = useState([]);
  const [done, setDone] = useState([]);

  const damateba = () => {
    if (task.trim() === "") return;
    setTodo([...todo, task]);
    setTask("");
  };

  const dasruleba = (index) => {
    const finishedTask = todo[index];
    setDone([...done, finishedTask]);
    setTodo(todo.filter((_, i) => i !== index));
  };

  const ukandabruneba = (index) => {
    const returnedTask = done[index];
    setTodo([...todo, returnedTask]);
    setDone(done.filter((_, i) => i !== index));
  };

  const washla = (index) => {
    setTodo(todo.filter((_, i) => i !== index));
  };

  const kidewashla = (index) => {
    setDone(done.filter((_, i) => i !== index));
  };

  return (
    <div className="app-container">
      <h1>სქილვილის To Do სია</h1>

      <div className="input-wrap">
        <input
          type="text"
          placeholder="დაამატე დავალება"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={damateba}>დამატება</button>
      </div>

      <div className="columns">
        <div className="column">
          <h2>გასაკეთებელი</h2>
          <ul>
            {todo.length === 0 ? (
              <li className="placeholder">
                <p>ახალი დავალება დაემატება აქ</p>
              </li>
            ) : (
              todo.map((item, index) => (
                <li key={index}>
                  {item}
                  <div className="button-group">
                    <button
                      className="done-btn"
                      onClick={() => dasruleba(index)}
                    >
                      დასრულება
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => washla(index)}
                    >
                      წაშლა
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="column">
          <h2>გაკეთებული</h2>
          <ul>
            {done.length === 0 ? (
              <li className="placeholder">
                <p>თუ დაასრულე გადმოიტანე აქ</p>
              </li>
            ) : (
              done.map((item, index) => (
                <li key={index}>
                  {item}
                  <div className="button-group">
                    <button
                      className="back-btn"
                      onClick={() => ukandabruneba(index)}
                    >
                      უკან
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => kidewashla(index)}
                    >
                      წაშლა
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
