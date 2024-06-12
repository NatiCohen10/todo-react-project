import React from "react";
function AddTodoForm({ addTodo, addTodoInputRef }) {
  return (
    <form className="add-todo-form" onSubmit={addTodo}>
      <label className="add-todo-label" htmlFor="todoAddInput">
        Add a new todo:
      </label>
      <input
        ref={addTodoInputRef}
        className="add-todo-input"
        type="text"
        id="todoAddInput"
        required
      />
      <button className="add-todo-btn">Add todo</button>
    </form>
  );
}

export default AddTodoForm;
