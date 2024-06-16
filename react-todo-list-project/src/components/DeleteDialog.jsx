import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useState } from "react";

function DeleteDialog(props) {
  const { deleteTodo, todoId, isDialogOpen, setIsDialogOpen } = props;

  function handleDialogClose() {
    setIsDialogOpen(false);
  }

  function handleDelete() {
    console.log(todoId);
    deleteTodo(todoId);
    setIsDialogOpen(false);
  }

  return (
    <>
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Delete Todo?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Once you delete this item, you won't be able to undo it!
          </DialogContentText>
          <DialogContentText sx={{ fontWeight: "bold" }}>
            Still wish to delete dialog?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} sx={{ fontWeight: "bold" }}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDelete();
            }}
            sx={{ color: red[500], fontWeight: "bold" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default DeleteDialog;
