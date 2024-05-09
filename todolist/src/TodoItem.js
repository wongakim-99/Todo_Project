import React from "react";

const TodoItem = (props) => {
  return (
    <li>
      <span>{props.todoItem.todoItemContent}</span>
    </li>
  );
};

export default TodoItem;
