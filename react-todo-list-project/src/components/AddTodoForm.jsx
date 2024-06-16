import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Tooltip,
  CircularProgress,
  Typography,
  Autocomplete,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const categories = [
  { label: "study" },
  { label: "work" },
  { label: "development" },
  { label: "project" },
  { label: "testing" },
  { label: "deployment" },
];

function AddTodoForm({
  addTodo,
  addTodoInputRef,
  loading,
  selectedLabels,
  setSelectedLabels,
  addTodoDescRef,
}) {
  return (
    <Card>
      <CardContent>
        <form className="add-todo-form">
          <TextField
            id="todoAddInput"
            inputRef={addTodoInputRef}
            required
            label="Add new todo"
            variant="filled"
          />

          <TextField
            inputRef={addTodoDescRef}
            required
            label="Add todo description"
          ></TextField>

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
              onClick={addTodo}
              sx={{ paddingBlock: "1em", marginTop: "1em" }}
              disabled={loading}
            >
              {loading ? (
                <Typography variant="body1" component="p">
                  Submitting...
                </Typography>
              ) : (
                <AddIcon sx={{ height: 30, width: 30 }} />
              )}
            </Button>
          </Tooltip>
        </form>
      </CardContent>
    </Card>
  );
}

export default AddTodoForm;
