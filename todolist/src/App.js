import "./App.css";
import TodoItemInputField from "./TodoItemInputField";
import TodoItemList from "./TodoItemList";
import { useState } from "react";

let todoItemId = 0;

const App = () => {
  const [todoItemList, setTodoItemList] = useState([]);

  const onSubmit = (newTodoItem) => {
    setTodoItemList([
      ...todoItemList,
      {
        id: todoItemId++,
        todoItemContent: newTodoItem,
        isFinished: false,
      },
    ]);
  };

  return (
    <div className="App">
      <TodoItemInputField onSubmit={onSubmit} />
      <TodoItemList todoItemList={todoItemList} />
    </div>
  );
};

export default App;
