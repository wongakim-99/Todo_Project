import React from "react";
import TodoItem from "./TodoItem";

const TodoItemList = (props) => {
  const todoList = props.todoItemList.map((todoItem, index) => {
    return <TodoItem key={index} todoItem={todoItem} />;
  });
  return (
    <div>
      <ul>{todoList}</ul>
    </div>
  );
};

export default TodoItemList;
