import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ClassIcon from "@mui/icons-material/Class";
import BadgeIcon from "@mui/icons-material/Badge";
import CodeIcon from "@mui/icons-material/Code";
import UploadIcon from "@mui/icons-material/Upload";
import QuizIcon from "@mui/icons-material/Quiz";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "../components/DeleteDialog";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { blue, orange } from "@mui/material/colors";

const labelIconMap = {
  study: <ClassIcon />,
  work: <BadgeIcon />,
  deployment: <UploadIcon />,
  project: <CodeIcon />,
  testing: <QuizIcon />,
  development: <IntegrationInstructionsIcon />,
};

function TodoDetailsPage() {
  const [todo, setTodo] = useState(null);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editedTodoTitle, setEditedTodoTitle] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const newTitleRef = useRef(null);
  const { todoId } = useParams();
  const navigate = useNavigate();
  const url = "http://localhost:8001/todo-items";

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const todo = await axios.get(`${url}/${todoId}`);
        setTodo(todo.data);
        setEditedTodoTitle(todo.data.title);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTodo();
  }, [todoId]);

  useEffect(() => {
    setEditedTodoTitle(editedTodoTitle);
  }, [editedTodoTitle]);

  async function deleteTodo() {
    try {
      await axios.delete(`${url}/${todoId}`);
      buildSnackbar("success", "todo deleted successfuly");
      navigate(-1);
    } catch (error) {
      buildSnackbar("error", "couldn't delete todo, try again later");
    }

    function buildSnackbar(severity, message) {
      setSeverity(severity);
      setMessage(message);
      setOpen(true);
    }
  }
  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }

  function handleToggleEdit() {
    setIsEdit((prev) => !prev);
  }

  useEffect(() => {
    if (isEdit) {
      newTitleRef.current.focus();
    }
  }, [isEdit]);
  function editNewTitle() {
    const newTodoTitle = newTitleRef.current.value;
    try {
      axios.patch(`${url}/${todoId}`, { title: newTodoTitle });
      setTodo((prevTodo) => {
        return { ...prevTodo, title: newTodoTitle };
      });
      setIsEdit(false);
    } catch (error) {
      buildSnackbar("error", "couldn't connect to server, try again later");
    }
  }
  if (!todo) {
    return <div>Loading...</div>;
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

      <Card sx={{ height: "50vh", padding: "1em" }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: "0px",
          }}
        >
          <div className="individual-todo-title">
            <IconButton
              onClick={() => {
                navigate(-1);
              }}
              sx={{ display: "inline", color: orange[800] }}
            >
              <ArrowBackIcon />
            </IconButton>
            {!isEdit ? (
              <>
                <Typography variant="h4" component="h2">
                  {todo.title}
                </Typography>
                <Button onClick={() => handleToggleEdit()}>
                  <EditIcon />
                </Button>
              </>
            ) : (
              <>
                <TextField
                  value={editedTodoTitle}
                  onChange={(ev) => setEditedTodoTitle(ev.target.value)}
                  label="Todo Name"
                  inputRef={newTitleRef}
                  sx={{ width: "100%" }}
                />
                <Button onClick={() => editNewTitle()}>
                  <EditIcon />
                </Button>
              </>
            )}
          </div>
          <Typography variant="body1" component="p">
            {todo.description}
          </Typography>
          <Typography></Typography>
          <div>
            {todo.labels.map((label, index) => (
              <Chip
                key={index} // Ensure key is unique and not spread from an object
                icon={labelIconMap[label]}
                label={label}
                sx={{ marginRight: "0.5em", marginBottom: "0.5em" }}
              />
            ))}
          </div>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button
            onClick={() => {
              console.log(todo.id);
              setIsDialogOpen(true);
            }}
            variant="contained"
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{ padding: "10px" }}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
      <DeleteDialog
        todoId={todo.id}
        deleteTodo={deleteTodo}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </>
  );
}

export default TodoDetailsPage;
