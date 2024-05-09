import React from "react";

const TodoItemList = (props) => {
  const todoList = props.todoItemList.map((todoItem, index) => {
    return <li key={index}>{todoItem.todoItemContent}</li>;
  });
  return (
    <div>
      <ul>{todoList}</ul>
    </div>
  );
};

export default TodoItemList;
