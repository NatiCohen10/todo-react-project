import React from "react";
import {
  Button,
  Card,
  CardContent,
  Skeleton,
  TextField,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Height } from "@mui/icons-material";

function AddTodoForm({ addTodo, addTodoInputRef, loading }) {
  return (
    <Card>
      <CardContent>
        <form className="add-todo-form" onSubmit={addTodo}>
          <TextField
            id="todoAddInput"
            inputRef={addTodoInputRef}
            required
            label="Add new todo"
            variant="filled"
          />
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
              sx={{ paddingBlock: "1em" }}
            >
              <AddIcon sx={{ height: 30, width: 30 }} />
            </Button>
          </Tooltip>
        </form>
      </CardContent>
    </Card>
  );
}

export default AddTodoForm;
