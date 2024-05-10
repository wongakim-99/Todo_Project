import { AppBar, Typography, Toolbar } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";

const TodoListAppBar = (props) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Todo List App
        </Typography>
        <Button color="inherit">Log In</Button>
      </Toolbar>
    </AppBar>
  );
};

export default TodoListAppBar;
