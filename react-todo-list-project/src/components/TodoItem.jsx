import React, { useState } from "react";
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
import { blue } from "@mui/material/colors";
import ClassIcon from "@mui/icons-material/Class";
import BadgeIcon from "@mui/icons-material/Badge";
import CodeIcon from "@mui/icons-material/Code";
import UploadIcon from "@mui/icons-material/Upload";
import QuizIcon from "@mui/icons-material/Quiz";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import DeleteDialog from "./DeleteDialog";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { ExpandMore } from "@mui/icons-material";

const StyledButton = styled(Button)(({ theme }) => ({
  padding: "8px 16px",
  maxHeight: "50px",
}));

// Object mapping to associate labels with icons
const labelIconMap = {
  study: <ClassIcon />,
  work: <BadgeIcon />,
  deployment: <UploadIcon />,
  project: <CodeIcon />,
  testing: <QuizIcon />,
  development: <IntegrationInstructionsIcon />,
};

function TodoItem({ todo, deleteTodo, toggleTodoComplete }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const todoLabels = todo.labels || [];

  const handleCheckboxChange = (event) => {
    event.stopPropagation();
    toggleTodoComplete(todo);
  };

  return (
    <li className="todo-list-item" key={todo.id}>
      <div className="list-item-content">
        <div className="item-info">
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={todo.isComplete}
                    id={todo.id}
                    onChange={handleCheckboxChange}
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
            </AccordionSummary>
            <AccordionDetails
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <div className="todo-description">{todo.description}</div>
                <div className="chip-wrapper">
                  {todoLabels.map((label, index) => (
                    <Chip
                      key={index} // Ensure key is unique and not spread from an object
                      icon={labelIconMap[label]}
                      label={label}
                      sx={{ marginRight: "0.5em", marginBottom: "0.5em" }}
                    />
                  ))}
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
                    console.log(todo.id);
                    setIsDialogOpen(true);
                  }}
                  variant="contained"
                  size="small"
                  color="error"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </StyledButton>
              </Tooltip>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>

      <DeleteDialog
        todoId={todo.id}
        deleteTodo={deleteTodo}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </li>
  );
}

export default TodoItem;
