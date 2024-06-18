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

  function editNewTitle() {
    const newTodoTitle = newTitleRef.current.value;
    console.log(newTodoTitle);
    try {
      axios.patch(`${url}/${todoId}`, { title: newTodoTitle });
      setTodo((prevTodo) => {
        return { ...prevTodo, title: newTodoTitle };
      });
      setEditedTodoTitle(newTodoTitle);
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
        <CardActions>
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

// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Button } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";
// import axios from "axios";

// const URL = "http://localhost:8001/data/";

// function TodoDetailsPage() {
//   const { todoId } = useParams();
//   const [todoDetails, setTodoDetails] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const [value, setValue] = useState("");
//   const newTitle = useRef("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(URL + todoId);
//         const result = await response.json();
//         setTodoDetails(result);
//         setValue(result.title);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, [todoId]);

//   const handleToggleEdit = () => {
//     setIsEditing((prev) => !prev);
//   };

//   const handleChange = (e) => {
//     setValue(e.target.value);
//   };

//   const editTitle = async () => {
//     const newTitleValue = newTitle.current.value;
//     try {
//       await axios.patch(URL + todoId, { title: newTitleValue });
//       setTodoDetails((prevDetails) => ({
//         ...prevDetails,
//         title: newTitleValue,
//       }));
//       setValue(newTitleValue);
//       setIsEditing(false);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="container-2">
//       <div className="detail-container">
//         <div className="top">
//           {isEditing ? (
//             <>
//               <input
//                 type="text"
//                 value={value}
//                 onChange={handleChange}
//                 ref={newTitle}
//                 autoFocus
//               />
//               <Button onClick={editTitle}>
//                 <SaveIcon />
//               </Button>
//             </>
//           ) : (
//             <>
//               <h1>{value}</h1>
//               <Button onClick={handleToggleEdit}>
//                 <EditIcon />
//               </Button>
//             </>
//           )}
//         </div>
//         <p>Labels: {todoDetails.labels?.join(", ")}</p>
//         <p>Description: {todoDetails.description}</p>
//       </div>
//     </div>
//   );
// }

// export default TodoDetailsPage;
