import React from "react";

function TodosFilter({
  searchItem,
  setSearchItem,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <>
      <h2>Filter Todos</h2>
      <div className="filterSectionWrapper">
        <div className="nameFilterWrapper">
          <input
            value={searchItem}
            onChange={(ev) => {
              setSearchItem(ev.target.value);
            }}
            type="search"
            placeholder="Search todos..."
          />
        </div>
        <div className="statusFilterWrapper">
          <label htmlFor="allItems">
            <input
              type="radio"
              id="allItems"
              value="all"
              checked={statusFilter === "all"}
              onChange={(e) => {
                setStatusFilter(e.target.value);
              }}
            />
            All todos
          </label>
          <label htmlFor="completeItems">
            <input
              type="radio"
              id="completeItems"
              value="complete"
              checked={statusFilter === "complete"}
              onChange={(e) => {
                setStatusFilter(e.target.value);
              }}
            />
            Complete todos
          </label>
          <label htmlFor="uncompleteItems">
            <input
              type="radio"
              id="uncompleteItems"
              value="uncomplete"
              checked={statusFilter === "uncomplete"}
              onChange={(e) => {
                setStatusFilter(e.target.value);
              }}
            />
            Uncomplete todos
          </label>
        </div>
      </div>
    </>
  );
}
export default TodosFilter;
