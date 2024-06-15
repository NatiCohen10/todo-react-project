import React from "react";

function AddTodoForm({ addTodo, addTodoInputRef }) {
  return (
    <form className="add-todo-form" onSubmit={addTodo}>
      <input
        ref={addTodoInputRef}
        className="add-todo-input"
        type="text"
        id="todoAddInput"
        required
        placeholder="Add new todo"
      />
      <button className="add-todo-btn">Add todo</button>
    </form>
  );
}

export default AddTodoForm;
