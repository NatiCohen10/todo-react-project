import React, { useEffect, useMemo, useRef, useState } from "react";
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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const filteredTodos = useMemo(() => {
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
  }, [statusFilter, todos, debouncedSearchItem]);

  async function fetchTodos() {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8001/todo-items");
      setTodos(response.data);
      setError(null);
    } catch (error) {
      setError("cannot fetch data!");
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteTodo(todoId) {
    try {
      await axios.delete(`http://localhost:8001/todo-items/${todoId}`);
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== todoId);
      });
    } catch (error) {
      console.error(error);
      alert("cant delete!");
    }
  }

  async function toggleTodoComplete(todo) {
    try {
      await axios.patch(`http://localhost:8001/todo-items/${todo.id}`, {
        isComplete: !todo.isComplete,
      });
      setTodos((prevTodos) => {
        return prevTodos.map((currentTodo) => {
          if (currentTodo.id === todo.id) {
            return { ...currentTodo, isComplete: !currentTodo.isComplete };
          }
          return currentTodo;
        });
      });
    } catch (error) {
      console.error("Error updating todo:", error);
      alert("cant toggle");
    }
  }

  async function postNewTodo(newTodo) {
    try {
      // Axios POST request
    } catch (error) {
      console.error(error);
    }
  }

  async function addTodo(ev) {
    try {
      ev.preventDefault();
      const newTodo = {
        id: makeId(5),
        title: addTodoInputRef.current.value,
        isComplete: false,
      };
      await axios.post("http://localhost:8001/todo-items", newTodo);
      setTodos((prevTodos) => {
        return [...prevTodos, newTodo];
      });
      addTodoInputRef.current.value = "";
      addTodoInputRef.current.focus();
    } catch (error) {
      console.error(error);
      alert("cant add todo");
    }
  }

  return (
    <div className="content-wrapper">
      <div className="content-card">
        <h1>My Todos</h1>
        <AddTodoForm addTodo={addTodo} addTodoInputRef={addTodoInputRef} />

        <TodosFilter
          searchItem={searchItem}
          setSearchItem={setSearchItem}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <>
          <TodoList
            todos={filteredTodos}
            setTodos={setTodos}
            toggleTodoComplete={toggleTodoComplete}
            deleteTodo={deleteTodo}
            loading={loading}
            error={error}
          />
          <TodoStatistics todos={todos} />
        </>
      </div>
    </div>
  );
}

export default App;
