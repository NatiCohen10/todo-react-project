import React from "react";
import TodoItem from "./TodoItem";
import { Card, CardContent, Skeleton } from "@mui/material";

function TodoList({
  todos,
  setTodos,
  deleteTodo,
  toggleTodoComplete,
  loading,
  error,
}) {
  if (loading) {
    const skeletonItems = [];
    for (let index = 0; index < 6; index++) {
      skeletonItems.push(
        <Skeleton
          key={index}
          variant="rectangular"
          width="100%"
          height={60}
          sx={{ marginBottom: 5 }}
        />
      );
    }
    return skeletonItems;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Card>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}

export default TodoList;
