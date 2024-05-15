import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";

import React from "react";

const TodoItem = (props) => {
  const style = props.todoItem.isFinished
    ? { textDecoration: "line-through" }
    : {};
  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="comments"
          onClick={() => props.onRemoveClick(props.todoItem)}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemButton
        role={undefined}
        onClick={() => props.onTodoItemClick(props.todoItem)}
        dense
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={props.todoItem.isFinished}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText style={style} primary={props.todoItem.todoItemContent} />
      </ListItemButton>
    </ListItem>
  );
};

export default TodoItem;
