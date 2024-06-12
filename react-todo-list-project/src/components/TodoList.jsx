import React from "react";
import TodoItem from "./TodoItem";
function TodoList({ todos, setTodos, deleteTodo, toggleTodoComplete }) {
  return (
    <>
      <div>
        <ul className="todo-wrapper">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              todos={todos}
              setTodo={setTodos}
              toggleTodoComplete={toggleTodoComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default TodoList;
