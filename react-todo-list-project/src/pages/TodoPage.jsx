import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios"; // Import Axios
import TodoList from "../components/TodoList";
import AddTodoForm from "../components/AddTodoForm";
import TodoStatistics from "../components/TodoStatistics";
import TodosFilter from "../components/TodosFilter";
import { Alert, Button, IconButton, Snackbar, Typography } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CreateTodoPage from "./CreateTodoPage";

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

function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [debouncedSearchItem, setDebouncedSearchItem] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const addTodoInputRef = useRef(null);
  const addTodoDescRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

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
  }, [location.pathname]);

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

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }

  function buildSnackbar(severity, message) {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  }

  async function fetchTodos() {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8001/todo-items");
      setTodos(response.data);
      setError(null);
    } catch (error) {
      buildSnackbar("error", "failed to fetch data from server");
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
      buildSnackbar("success", "todo deleted successfuly");
    } catch (error) {
      buildSnackbar("error", "couldn't delete todo, try again later");
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

      buildSnackbar(
        "success",
        todo.isComplete ? "Unchecked todo" : "Checked todo"
      );
    } catch (error) {
      buildSnackbar("error", "couldn't connect to server! try again later");
    }
  }

  function validateNewTodo() {
    if (
      addTodoInputRef.current.value.trim() === "" ||
      addTodoDescRef.current.value === ""
    ) {
      return true;
    }
    return false;
  }

  // async function addTodo(ev) {
  //   try {
  //     ev.preventDefault();
  //     if (validateNewTodo()) {
  //       buildSnackbar(
  //         "error",
  //         "please fill all of the required fields before adding a todo!"
  //       );
  //       return;
  //     }
  //     setAddingTodo(true);
  //     const newTodo = {
  //       title: addTodoInputRef.current.value,
  //       description: addTodoDescRef.current.value,
  //       isComplete: false,
  //       labels: ["work", "study"],
  //     };
  //     await axios.post("http://localhost:8001/todo-items", newTodo);
  //     setTodos((prevTodos) => {
  //       return [...prevTodos, newTodo];
  //     });
  //     addTodoInputRef.current.value = "";
  //     addTodoDescRef.current.value = "";
  //     addTodoInputRef.current.focus();
  //     setSelectedLabels([]);
  //     buildSnackbar("success", "Todo Added Successfuly");
  //   } catch (error) {
  //     buildSnackbar("error", "couldn't connect to server! try again later");
  //   } finally {
  //     setAddingTodo(false);
  //   }
  // }

  const isCreating = location.pathname === "/todo/create";

  function handleCloseModal() {
    navigate(-1);
  }
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Typography variant="h2" component="h1" sx={{ marginBottom: "0.5em" }}>
        My todos
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          navigate("/todo/create");
        }}
      >
        Add todo
      </Button>

      <TodoStatistics todos={todos} loading={loading} />

      <TodosFilter
        searchItem={searchItem}
        setSearchItem={setSearchItem}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        loading={loading}
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
      </>
      {isCreating && (
        <CreateTodoPage
          openDialog={isCreating}
          buildSnackbar={buildSnackbar}
          handleClose={handleCloseModal}
          validateNewTodo={validateNewTodo}
          severity={severity}
          setSeverity={setSeverity}
          open={open}
          setOpen={setOpen}
          message={message}
          setMessage={setMessage}
          addTodoInputRef={addTodoInputRef}
          addTodoDescRef={addTodoDescRef}
        />
      )}
      <Outlet />
    </>
  );
}

export default TodoPage;
