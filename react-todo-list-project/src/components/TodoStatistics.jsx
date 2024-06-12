function TodoStatistics({ todos }) {
  return (
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
  );
}

export default TodoStatistics;
