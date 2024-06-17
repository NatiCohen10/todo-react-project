import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Tooltip,
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
            ></TextField>
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
