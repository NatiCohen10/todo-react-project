import React, { useState } from "react";

const TODO_ITEMS = [
  { id: "1", title: "Learn React", isComplete: false },
  { id: "2", title: "Build a Todo App", isComplete: false },
  { id: "3", title: "Read JavaScript Documentation", isComplete: true },
  { id: "4", title: "Write Unit Tests", isComplete: false },
  { id: "5", title: "Implement Context", isComplete: true },
  { id: "6", title: "Create Portfolio Website", isComplete: false },
  { id: "7", title: "Learn TypeScript", isComplete: false },
  { id: "8", title: "Refactor Codebase", isComplete: true },
  { id: "9", title: "Optimize Performance", isComplete: false },
  { id: "10", title: "Deploy to Production", isComplete: true },
];

function makeId(length = 5) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function App() {
  const [todos, setTodos] = useState(TODO_ITEMS);
  const [newTodoName, setNewTodoName] = useState("");

  function addTodo(ev) {
    ev.preventDefault();
    const newTodo = {
      id: makeId(5),
      title: newTodoName,
      isComplete: false,
    };
    const copyTodos = [...todos, newTodo];
    setTodos(copyTodos);
    setNewTodoName("");
  }

  function deleteTodo(todoId) {
    const copyTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(copyTodos);
  }

  function toggleTodoComplete(todoId) {
    const copyTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isComplete: !todo.isComplete };
      }
      return todo;
    });
    setTodos(copyTodos);
  }

  return (
    <div className="content-wrapper">
      <div className="content-card">
        {todos.length === 0 ? (
          <>
            <p className="no-todos-paragraph">No todos available</p>
          </>
        ) : (
          <>
            <form className="add-todo-form" onSubmit={addTodo}>
              <label className="add-todo-label" htmlFor="todoAddInput">
                Add a new todo:
              </label>
              <input
                className="add-todo-input"
                type="text"
                id="todoAddInput"
                value={newTodoName}
                onChange={(ev) => {
                  setNewTodoName(ev.target.value);
                }}
              />
              <button className="add-todo-btn">Add todo</button>
            </form>
            <div>
              <ul className="todo-wrapper">
                {todos.map((todo) => (
                  <li className="todo-list-item" key={todo.id}>
                    <div className="list-item-content">
                      <input
                        type="checkbox"
                        checked={todo.isComplete}
                        id={todo.id}
                        className={`${
                          todo.isComplete ? "complete" : ""
                        } todo-item-checkbox custom-checkbox`}
                        onChange={() => {
                          toggleTodoComplete(todo.id);
                        }}
                      />
                      <label
                        className={`${
                          todo.isComplete ? "complete" : ""
                        } todo-item-name custom-checkbox-label`}
                        htmlFor={todo.id}
                      >
                        {todo.title}
                      </label>
                    </div>
                    <button
                      className="delete-btn"
                      onClick={() => {
                        deleteTodo(todo.id);
                      }}
                    >
                      Delete todo
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="detail-wrapper">
                <p className="detail-paragraph">Total todos: {todos.length}</p>
                <p className="detail-paragraph">
                  Completed todos:
                  {todos.filter((todo) => todo.isComplete === true).length}
                </p>
                <p className="detail-paragraph">
                  Active Todos:
                  {
                    todos.filter((todo) => {
                      return todo.isComplete === false;
                    }).length
                  }
                </p>
              </div>
              <label className="progress-bar-label" htmlFor="progressBar">
                Todos progress:
              </label>
              <progress
                className="progress-bar"
                id="progressBar"
                value={todos.filter((todo) => todo.isComplete === true).length}
                max={todos.length}
              ></progress>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
