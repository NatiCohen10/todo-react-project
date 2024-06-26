import React from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Tabs,
  Tab,
  Skeleton,
} from "@mui/material";

function TodosFilter({ statusFilter, setSearchParams, q }) {
  const handleTabChange = (event, newValue) => {
    setSearchParams((prev) => {
      prev.set("status", newValue);
      return prev;
    });
  };

  return (
    <>
      <Card sx={{ marginBlock: "1em" }}>
        <CardContent>
          <Typography
            variant="h4"
            component="h2"
            sx={{ fontWeight: "600", marginBottom: "0.25em" }}
          >
            Filter Todos
          </Typography>

          <div className="filterSectionWrapper">
            <div className="nameFilterWrapper">
              <TextField
                value={q}
                onChange={(e) =>
                  setSearchParams((prev) => {
                    prev.set("q", e.target.value);
                    return prev;
                  })
                }
                label="Search Items..."
                variant="standard"
              />
            </div>
            <div className="statusFilterWrapper">
              <Tabs
                value={statusFilter || "all"}
                onChange={handleTabChange}
                aria-label="filter tabs"
                sx={{ width: "100%" }}
                centered
              >
                <Tab label="All Items" value="all" />
                <Tab label="Active Todos" value="active" />
                <Tab label="Complete Todos" value="complete" />
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default TodosFilter;
