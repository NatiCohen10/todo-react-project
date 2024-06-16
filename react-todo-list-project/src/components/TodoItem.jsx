import React from "react";
import {
  Button,
  FormControlLabel,
  Checkbox,
  Tooltip,
  Chip,
  ListItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { blue, purple } from "@mui/material/colors";
import ClassIcon from "@mui/icons-material/Class";
import BadgeIcon from "@mui/icons-material/Badge";
import CodeIcon from "@mui/icons-material/Code";
import UploadIcon from "@mui/icons-material/Upload";
import QuizIcon from "@mui/icons-material/Quiz";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";

const StyledButton = styled(Button)(({ theme }) => ({
  padding: "8px 16px",
  maxHeight: "50px",
}));

function TodoItem({ todo, deleteTodo, toggleTodoComplete }) {
  const todoLabels = todo.labels;

  return (
    <li className="todo-list-item" key={todo.id}>
      <div className="list-item-content">
        <div className="item-info">
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

          <div className="chip-wrapper">
            {todoLabels.map((label) => {
              let icon;
              if (label === "study") {
                icon = <ClassIcon />;
              }
              if (label === "work") {
                icon = <BadgeIcon />;
              }
              if (label === "deployment") {
                icon = <UploadIcon />;
              }
              if (label === "project") {
                icon = <CodeIcon />;
              }
              if (label === "testing") {
                icon = <QuizIcon />;
              }
              if (label === "development") {
                icon = <IntegrationInstructionsIcon />;
              }
              return (
                <Chip
                  key={label}
                  icon={icon}
                  label={label}
                  sx={{ marginRight: "0.5em", marginBottom: "0.5em" }}
                />
              );
            })}
          </div>
        </div>
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
