import "./App.css";
import TodoItemInputField from "./TodoItemInputField";
import TodoItemList from "./TodoItemList";
import { useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzGzhVvNxftVUbxCLudMG6apP5auR56ls",
  authDomain: "todolist-f0d54.firebaseapp.com",
  projectId: "todolist-f0d54",
  storageBucket: "todolist-f0d54.appspot.com",
  messagingSenderId: "800631363262",
  appId: "1:800631363262:web:448c743ec556cce326b0ef",
  measurementId: "G-7544P1V0ZJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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

  const onTodoItemClick = (clickedTodoItem) => {
    setTodoItemList(
      todoItemList.map((todoItem) => {
        if (clickedTodoItem.id === todoItem.id) {
          return {
            id: clickedTodoItem.id,
            todoItemContent: clickedTodoItem.todoItemContent,
            isFinished: !clickedTodoItem.isFinished,
          };
        } else {
          return todoItem;
        }
      })
    );
  };

  const onRemoveClick = (removedTodoItem) => {
    setTodoItemList(
      todoItemList.filter((todoItem) => {
        return todoItem.id !== removedTodoItem.id;
      })
    );
  };

  return (
    <div className="App">
      <TodoItemInputField onSubmit={onSubmit} />
      <TodoItemList
        todoItemList={todoItemList}
        onTodoItemClick={onTodoItemClick}
        onRemoveClick={onRemoveClick}
      />
    </div>
  );
};

export default App;
