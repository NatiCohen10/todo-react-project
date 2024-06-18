import {
  Alert,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  TextField,
  Tooltip,
} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon
import axios from "axios";

function CreateTodoPage({
  openDialog,
  handleClose,
  addTodoInputRef,
  addTodoDescRef,
  buildSnackbar,
  validateNewTodo,
  severity,
  message,
  open,
  setOpen,
  setSeverity,
  setMessage,
}) {
  async function handleAddTodo(ev) {
    ev.preventDefault();
    try {
      if (validateNewTodo()) {
        return;
      }
      const newTodo = {
        title: addTodoInputRef.current.value,
        description: addTodoDescRef.current.value,
        isComplete: false,
        labels: ["work", "study"],
      };
      await axios.post("http://localhost:8001/todo-items", newTodo);
      buildSnackbar("success", "Todo Added Successfully");
      handleClose();
    } catch (error) {
      buildSnackbar("error", "Couldn't connect to server! Try again later");
    }
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
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Create New Todo</DialogTitle>
        <DialogContent>
          <IconButton
            aria-label="close"
            onClick={handleClose}
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
