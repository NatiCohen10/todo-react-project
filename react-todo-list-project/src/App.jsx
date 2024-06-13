import React, { useEffect, useRef, useState } from "react";
import axios from "axios"; // Import Axios

import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import TodoStatistics from "./components/TodoStatistics";
import TodosFilter from "./components/TodosFilter";

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
  const [todos, setTodos] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [debouncedSearchItem, setDebouncedSearchItem] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const addTodoInputRef = useRef(null);

  useEffect(() => {
    const debounceHandler = setTimeout(() => {
      setDebouncedSearchItem(searchItem);
    }, 500);

    return () => {
      clearTimeout(debounceHandler);
    };
  }, [searchItem]);

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    filterTodos();
  }, [statusFilter, todos, debouncedSearchItem]);

  async function fetchTodos() {
    try {
      const response = await axios.get("http://localhost:8001/todo-items");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  async function deleteDBTodo(todoId) {
    try {
      await axios.delete(`http://localhost:8001/todo-items/${todoId}`); // Axios DELETE request
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteTodo(todoId) {
    const copyTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(copyTodos);
    await deleteDBTodo(todoId);
  }

  async function postNewTodo(newTodo) {
    try {
      await axios.post("http://localhost:8001/todo-items", newTodo); // Axios POST request
    } catch (error) {
      console.error(error);
    }
  }

  async function toggleTodoComplete(todoId) {
    const copyTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        updateTodo(todo);
        return { ...todo, isComplete: !todo.isComplete };
      }
      return todo;
    });
    setTodos(copyTodos);
  }

  async function updateTodo(todo) {
    try {
      await axios.patch(`http://localhost:8001/todo-items/${todo.id}`, {
        isComplete: !todo.isComplete,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function addTodo(ev) {
    ev.preventDefault();
    const newTodo = {
      id: makeId(5),
      title: addTodoInputRef.current.value,
      isComplete: false,
    };
    addTodoInputRef.current.focus();
    const copyTodos = [newTodo, ...todos];
    setTodos(copyTodos);
    await postNewTodo(newTodo);
    addTodoInputRef.current.value = "";
  }

  function filterTodos() {
    let filtered = todos;
    if (debouncedSearchItem) {
      filtered = filtered.filter((todo) =>
        todo.title.toLowerCase().includes(debouncedSearchItem.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((todo) =>
        statusFilter === "complete" ? todo.isComplete : !todo.isComplete
      );
    }
    return filtered;
  }

  const filteredTodos = filterTodos();
  return (
    <div className="content-wrapper">
      <div className="content-card">
        <h1>My Todos</h1>
        <AddTodoForm addTodo={addTodo} addTodoInputRef={addTodoInputRef} />
        <TodosFilter
          filterTodos={filterTodos}
          searchItem={searchItem}
          setSearchItem={setSearchItem}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        {todos.length === 0 ? (
          <p className="no-todos-paragraph">No todos available</p>
        ) : (
          <>
            <TodoList
              todos={filteredTodos}
              setTodos={setTodos}
              toggleTodoComplete={toggleTodoComplete}
              deleteTodo={deleteTodo}
            />
            <TodoStatistics todos={todos} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
