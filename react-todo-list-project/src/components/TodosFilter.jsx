// import {
//   Card,
//   CardContent,
//   FormControlLabel,
//   Radio,
//   TextField,
//   Typography,
// } from "@mui/material";
// import React from "react";

// function TodosFilter({
//   searchItem,
//   setSearchItem,
//   statusFilter,
//   setStatusFilter,
// }) {
//   return (
//     <>
//       <Card sx={{ marginBlock: "1em" }}>
//         <CardContent>
//           <Typography
//             variant="h4"
//             component="h2"
//             sx={{ fontWeight: "600", marginBottom: "0.25em" }}
//           >
//             Filter Todos
//           </Typography>

//           <div className="filterSectionWrapper">
//             <div className="nameFilterWrapper">
//               <TextField
//                 value={searchItem}
//                 onChange={(ev) => {
//                   setSearchItem(ev.target.value);
//                 }}
//                 label="Search Items..."
//                 variant="standard"
//               />
//             </div>
//             <div className="statusFilterWrapper">
//               <FormControlLabel
//                 value="all"
//                 control={<Radio />}
//                 label="All Items"
//                 id="allItems"
//                 checked={statusFilter === "all"}
//                 onChange={(e) => {
//                   setStatusFilter(e.target.value);
//                 }}
//               />
//               <FormControlLabel
//                 value="uncomplete"
//                 control={<Radio />}
//                 label="Active todos"
//                 id="uncompleteItems"
//                 checked={statusFilter === "uncomplete"}
//                 onChange={(e) => {
//                   setStatusFilter(e.target.value);
//                 }}
//               />
//               <FormControlLabel
//                 value="complete"
//                 control={<Radio />}
//                 label="Complete todos"
//                 id="completeItems"
//                 checked={statusFilter === "complete"}
//                 onChange={(e) => {
//                   setStatusFilter(e.target.value);
//                 }}
//               />
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </>
//   );
// }
// export default TodosFilter;
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

function TodosFilter({
  searchItem,
  setSearchItem,
  statusFilter,
  setStatusFilter,
  loading,
}) {
  const handleTabChange = (event, newValue) => {
    setStatusFilter(newValue);
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
                value={searchItem}
                onChange={(ev) => {
                  setSearchItem(ev.target.value);
                }}
                label="Search Items..."
                variant="standard"
              />
            </div>
            <div className="statusFilterWrapper">
              <Tabs
                value={statusFilter}
                onChange={handleTabChange}
                aria-label="filter tabs"
                sx={{ width: "100%" }}
                centered
              >
                <Tab label="All Items" value="all" />
                <Tab label="Active Todos" value="uncomplete" />
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
