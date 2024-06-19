import {
  Alert,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import ClassIcon from "@mui/icons-material/Class";
import BadgeIcon from "@mui/icons-material/Badge";
import CodeIcon from "@mui/icons-material/Code";
import UploadIcon from "@mui/icons-material/Upload";
import QuizIcon from "@mui/icons-material/Quiz";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import { useNavigate } from "react-router-dom";

const labelIconArray = [
  { key: "study", label: "Study", icon: <ClassIcon /> },
  { key: "work", label: "Work", icon: <BadgeIcon /> },
  { key: "deployment", label: "Deployment", icon: <UploadIcon /> },
  { key: "project", label: "Project", icon: <CodeIcon /> },
  { key: "testing", label: "Testing", icon: <QuizIcon /> },
  {
    key: "development",
    label: "Development",
    icon: <IntegrationInstructionsIcon />,
  },
];

function CreateTodoPage() {
  const [chipArr, setChipArr] = useState([]);
  const addTodoInputRef = useRef(null);
  const addTodoDescRef = useRef(null);
  const navigate = useNavigate();

  function handleCloseModal() {
    navigate(-1);
  }

  async function handleAddTodo(ev) {
    ev.preventDefault();
    try {
      const newTodo = {
        title: addTodoInputRef.current.value,
        description: addTodoDescRef.current.value,
        isComplete: false,
        labels: chipArr,
      };
      await axios.post("http://localhost:8001/todo-items", newTodo);
      handleCloseModal();
      console.log("hi");
    } catch (error) {
      // buildSnackbar("error", "Couldn't connect to server! Try again later");
    }
  }

  function handleChipClick(chipKey) {
    if (chipArr.includes(chipKey)) {
      setChipArr(chipArr.filter((key) => key !== chipKey));
    } else {
      setChipArr([...chipArr, chipKey]);
    }
  }

  return (
    <>
      <Dialog open={true} onClose={handleCloseModal}>
        <DialogTitle>Create New Todo</DialogTitle>
        <DialogContent>
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            color="error"
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "gray",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Card>
            <CardContent>
              <form className="add-todo-form" onSubmit={handleAddTodo}>
                <div>
                  <TextField
                    id="todoAddInput"
                    inputRef={addTodoInputRef}
                    required
                    label="Add new todo"
                    variant="filled"
                    sx={{ width: "100%", marginBottom: "0.5em" }}
                  />
                  <TextField
                    inputRef={addTodoDescRef}
                    required
                    label="Add todo description"
                    sx={{ width: "100%" }}
                  />
                  <div className="chip-wrapper">
                    {labelIconArray.map((item) => (
                      <Chip
                        key={item.key}
                        icon={item.icon}
                        label={item.label}
                        onClick={() => handleChipClick(item.key)}
                        sx={{
                          marginRight: "0.5em",
                          marginBottom: "0.5em",
                          backgroundColor: chipArr.includes(item.key)
                            ? "#1976d2"
                            : undefined,
                          color: chipArr.includes(item.key)
                            ? "white"
                            : undefined,
                          "&:hover": {
                            backgroundColor: chipArr.includes(item.key)
                              ? "#1976d2"
                              : "#e0e0e0",
                          },
                        }}
                      />
                    ))}
                  </div>
                </div>
                <Tooltip
                  title="Add"
                  arrow
                  PopperProps={{
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -14],
                        },
                      },
                    ],
                  }}
                >
                  <Button
                    type="submit"
                    variant="outlined"
                    color="success"
                    sx={{ paddingBlock: "1em", marginTop: "1em" }}
                  >
                    <AddIcon sx={{ height: 30, width: 30 }} />
                  </Button>
                </Tooltip>
              </form>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateTodoPage;
