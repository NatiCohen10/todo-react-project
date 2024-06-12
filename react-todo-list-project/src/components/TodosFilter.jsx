import React from "react";

function TodosFilter({ filterTodos, searchItem, setSearchItem }) {
  return (
    <div>
      <input
        value={searchItem}
        onChange={(ev) => {
          setSearchItem(ev.target.value);
          filterTodos();
        }}
        type="text"
        placeholder="Search todos..."
      />
    </div>
  );
}
export default TodosFilter;
