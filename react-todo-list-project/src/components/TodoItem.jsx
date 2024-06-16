import React from "react";
import { Button, FormControlLabel, Checkbox, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { blue, purple } from "@mui/material/colors";

const StyledButton = styled(Button)(({ theme }) => ({
  padding: "8px 16px",
}));

function TodoItem({ todo, deleteTodo, toggleTodoComplete }) {
  return (
    <li className="todo-list-item" key={todo.id}>
      <div className="list-item-content">
        <FormControlLabel
          control={
            <Checkbox
              checked={todo.isComplete}
              id={todo.id}
              onChange={() => {
                toggleTodoComplete(todo);
              }}
              sx={{
                paddingRight: "10px",
                "&.Mui-checked": { color: blue[700] },
              }}
            />
          }
          label={
            <span className={`${todo.isComplete ? "complete" : ""}`}>
              {todo.title}
            </span>
          }
        />
      </div>

      <Tooltip
        title="Delete"
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
        <StyledButton
          onClick={() => {
            deleteTodo(todo.id);
          }}
          variant="contained"
          size="small"
          color="error"
          startIcon={<DeleteIcon />}
        >
          Delete
        </StyledButton>
      </Tooltip>
    </li>
  );
}

export default TodoItem;
