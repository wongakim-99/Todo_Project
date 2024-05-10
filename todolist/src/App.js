import "./App.css";
import TodoItemInputField from "./TodoItemInputField";
import TodoItemList from "./TodoItemList";
import { useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";
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

const db = getFirestore(app);

const App = () => {
  const [todoItemList, setTodoItemList] = useState([]);

  const onSubmit = async (newTodoItem) => {
    // 함수 내에서 await를 하기 위해서는 async를 해야됨
    /**todoItem이 추가될 때마다 데이터베이스에 작성
     * 기존에는 front base에만 업데이트를 했었지만 이제 firebase의 database에 아래의 내용을 작성*/
    const docRef = await addDoc(collection(db, "todoItem"), {
      //await : firebase에 저장을 하면 오래 걸리는 시간을 기다림
      //addDoc : firebase에 쓰라는 의미
      /**뭘 쓰라는 걸까? -> 인자로 전달된 db와todoItem을 보면된다.
       * 데이터 베이스에 todoItem이라는 컬렉션을 아래 두줄과 같은 JSON을 추가하라는 의미*/
      todoItemContent: newTodoItem,
      isFinished: false,
    });
    /***************************************************************************************/
    setTodoItemList([
      //위에서 firebase에 쓰고나서 frontend state에 아래와 같이 업데이트
      ...todoItemList,
      {
        id: docRef.id,
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
