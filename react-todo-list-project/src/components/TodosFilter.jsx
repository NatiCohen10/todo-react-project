import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

function TodosFilter({
  searchItem,
  setSearchItem,
  statusFilter,
  setStatusFilter,
  loading,
}) {
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
                value={searchItem}
                onChange={(ev) => {
                  setSearchItem(ev.target.value);
                }}
                label="Search Items..."
                variant="standard"
              />
            </div>
            <div className="statusFilterWrapper">
              <FormControlLabel
                value="all"
                control={<Radio />}
                label="All Items"
                id="allItems"
                checked={statusFilter === "all"}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                }}
              />
              <FormControlLabel
                value="uncomplete"
                control={<Radio />}
                label="Active todos"
                id="uncompleteItems"
                checked={statusFilter === "uncomplete"}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                }}
              />
              <FormControlLabel
                value="complete"
                control={<Radio />}
                label="Complete todos"
                id="completeItems"
                checked={statusFilter === "complete"}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
export default TodosFilter;
