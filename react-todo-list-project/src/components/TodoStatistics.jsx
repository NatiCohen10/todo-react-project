import {
  Card,
  CardContent,
  LinearProgress,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";

function TodoStatistics({ todos, loading }) {
  const completedCount = todos.filter((todo) => todo.isComplete).length;
  const totalCount = todos.length;

  // Calculate percentage completion
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  if (loading) {
    return (
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={60}
        sx={{ marginTop: "1em" }}
      />
    );
  }

  return (
    <Card sx={{ marginTop: "1em" }}>
      <CardContent>
        {" "}
        <div>
          <Typography
            variant="h4"
            component="h2"
            sx={{ fontWeight: "600", marginBottom: "0.5em" }}
          >
            Statistics
          </Typography>
          <div className="detail-wrapper">
            <Typography
              variant="body1"
              component="p"
              sx={{ fontWeight: "bold" }}
            >
              Total todos: {todos.length}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{ fontWeight: "bold" }}
            >
              Completed todos:
              {todos.filter((todo) => todo.isComplete === true).length}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{ fontWeight: "bold" }}
            >
              Active Todos:
              {
                todos.filter((todo) => {
                  return todo.isComplete === false;
                }).length
              }
            </Typography>
          </div>
          <label className="progress-bar-label" htmlFor="progressBar">
            Todos progress:
          </label>
          <LinearProgress
            className="progress-bar"
            id="progressBar"
            variant="determinate"
            value={progress}
            sx={{
              height: 15,
              borderRadius: 6,
              backgroundColor: "#f0f0f0",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#4caf50",
              },
              "& .MuiLinearProgress-barColorPrimary": {
                backgroundColor: "#4caf50",
              },
              "& .MuiLinearProgress-barColorSecondary": {
                backgroundColor: "#f44336",
              },
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default TodoStatistics;
