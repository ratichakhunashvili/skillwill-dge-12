import React, { useState, useCallback } from "react";
import "./App.css";

// es daimaxsovrebs da mxolod daa rerenderebs imdros rodesac ganxorcieldeba shecvla todoshi
const TodoList = React.memo(({ items, onComplete, onDelete }) => {
  return (
    <div className="column">
      <h2>გასაკეთებელი</h2>
      <ul>
        {items.length === 0 ? (
          <li className="placeholder">
            <p>ახალი დავალება დაემატება აქ</p>
          </li>
        ) : (
          items.map((item, index) => (
            <li key={index}>
              {item}
              <div className="button-group">
                <button
                  className="done-btn"
                  onClick={() => {
                    console.log(
                      "დასრულება clicked, index:",
                      index,
                      "task:",
                      item
                    );
                    onComplete(index);
                  }}
                >
                  დასრულება
                </button>
                <button
                  className="delete-btn"
                  onClick={() => {
                    console.log(
                      "წაშლა (todo) clicked, index:",
                      index,
                      "task:",
                      item
                    );
                    onDelete(index);
                  }}
                >
                  წაშლა
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
});

TodoList.displayName = "TodoList";

// es igives izams ogond dasrulebulebis mxares
const DoneList = React.memo(({ items, onReturn, onDelete }) => {
  return (
    <div className="column">
      <h2>გაკეთებული</h2>
      <ul>
        {items.length === 0 ? (
          <li className="placeholder">
            <p>თუ დაასრულე გადმოიტანე აქ</p>
          </li>
        ) : (
          items.map((item, index) => (
            <li key={index}>
              {item}
              <div className="button-group">
                <button
                  className="back-btn"
                  onClick={() => {
                    console.log("უკან clicked, index:", index, "task:", item);
                    onReturn(index);
                  }}
                >
                  უკან
                </button>
                <button
                  className="delete-btn"
                  onClick={() => {
                    console.log(
                      "წაშლა (done) clicked, index:",
                      index,
                      "task:",
                      item
                    );
                    onDelete(index);
                  }}
                >
                  წაშლა
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
});

DoneList.displayName = "DoneList";

function App() {
  const [task, setTask] = useState("");
  const [todo, setTodo] = useState([]);
  const [done, setDone] = useState([]);

  const damateba = useCallback(() => {
    console.log("დამატება (add) clicked, task:", task);
    if (task.trim() === "") return;
    setTodo((prevTodo) => [...prevTodo, task]);
    setTask("");
  }, [task]);

  const dasruleba = useCallback((index) => {
    console.log("dasruleba (complete) handler called, index:", index);
    const finishedTask = todo[index];
    console.log("Moving to done:", finishedTask);
    setDone((prevDone) => [...prevDone, finishedTask]);
    setTodo((prevTodo) => prevTodo.filter((_, i) => i !== index));
  }, [todo]);

  const ukandabruneba = useCallback((index) => {
    console.log("ukandabruneba (return) handler called, index:", index);
    setDone((prevDone) => {
      const returnedTask = prevDone[index];
      console.log("Moving back to todo:", returnedTask);
      setTodo((prevTodo) => [...prevTodo, returnedTask]);
      return prevDone.filter((_, i) => i !== index);
    });
  }, []);

  const washla = useCallback((index) => {
    console.log("washla (delete from todo) handler called, index:", index);
    setTodo((prevTodo) => prevTodo.filter((_, i) => i !== index));
  }, []);

  const kidewashla = useCallback((index) => {
    console.log("kidewashla (delete from done) handler called, index:", index);
    setDone((prevDone) => prevDone.filter((_, i) => i !== index));
  }, []);

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
        <TodoList items={todo} onComplete={dasruleba} onDelete={washla} />
        <DoneList items={done} onReturn={ukandabruneba} onDelete={kidewashla} />
      </div>
    </div>
  );
}

export default App;
