import React from "react";
import TodoItem from "./TodoItem";
function TodoList({
  todos,
  setTodos,
  deleteTodo,
  toggleTodoComplete,
  loading,
  error,
}) {
  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div>
        {todos.length === 0 ? (
          <p className="no-todos-paragraph">No todos available</p>
        ) : (
          <ul className="todo-wrapper">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
                toggleTodoComplete={toggleTodoComplete}
                deleteTodo={deleteTodo}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default TodoList;
