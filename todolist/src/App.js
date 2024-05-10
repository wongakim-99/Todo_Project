import "./App.css";
import TodoItemInputField from "./TodoItemInputField";
import TodoItemList from "./TodoItemList";
import { useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import TodoListAppBar from "./TodoListAppBar";
import { onAuthStateChanged, getAuth } from "firebase/auth";

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
//const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [todoItemList, setTodoItemList] = useState([]);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user.uid);
    } else {
      setCurrentUser(null);
    }
  });

  /***************************************************************************************/
  /** firestore를 업데이트 하는 이벤트가 3가지
   * 1. 새로운 아이템이 추가되었을 때
   * 2. isFinished를 할때
   * 3. 데이터를 지울 때
   * 이 이벤트를 진행할때마다 firestore에 이벤트를 보내고 우리가 front state를 바꿔준다.
   * 그러나 위와 같이 관리할 경우 굉장히 관리하기가 힘들어짐;;(나중에 state가 잘못되었을 때 헷갈릴수 있음)
   * 그래서 dataflow를 좀 더 수월하게 관리하기 위해 firestore가 업데이트 될 때마다 다시 firestore에서 다 읽어와서
   * 우리 state를 업데이트 하는 방식으로 진행 */
  /***************************************************************************************/

  const syncTodoItemListStateWithFirestore = () => {
    const q = query(collection(db, "todoItem"), orderBy("createdTime", "desc"));

    getDocs(q).then((QuerySnapshot) => {
      const firestoreTodoItemList = [];
      QuerySnapshot.forEach((doc) => {
        firestoreTodoItemList.push({
          id: doc.id,
          todoItemContent: doc.data().todoItemContent,
          isFinished: doc.data().isFinished,
          createdTime: doc.data().createdTime ?? 0, //todo Item의 time stamp를 추가된 순서대로 보여줌
        });
      });
      setTodoItemList(firestoreTodoItemList);
    });
  };

  useEffect(() => {
    syncTodoItemListStateWithFirestore();
  }, []);

  const onSubmit = async (newTodoItem) => {
    // 함수 내에서 await를 하기 위해서는 async를 해야됨
    /**todoItem이 추가될 때마다 데이터베이스에 작성
     * 기존에는 front base에만 업데이트를 했었지만 이제 firebase의 database에 아래의 내용을 작성*/
    await addDoc(collection(db, "todoItem"), {
      //await : firebase에 저장을 하면 오래 걸리는 시간을 기다림
      //addDoc : firebase에 쓰라는 의미
      /**뭘 쓰라는 걸까? -> 인자로 전달된 db와todoItem을 보면된다.
       * 데이터 베이스에 todoItem이라는 컬렉션을 아래 두줄과 같은 JSON을 추가하라는 의미*/
      todoItemContent: newTodoItem,
      isFinished: false,
      createdTime: Math.floor(Date.now() / 1000),
    });
    syncTodoItemListStateWithFirestore();
  };

  const onTodoItemClick = async (clickedTodoItem) => {
    const todoItemRef = doc(db, "todoItem", clickedTodoItem.id);
    await setDoc(
      todoItemRef,
      { isFinished: !clickedTodoItem.isFinished },
      { merge: true }
    );
    syncTodoItemListStateWithFirestore();
  };

  const onRemoveClick = async (removedTodoItem) => {
    const todoItemRef = doc(db, "todoItem", removedTodoItem.id);
    await deleteDoc(todoItemRef);
    syncTodoItemListStateWithFirestore();
  };

  return (
    <div className="App">
      <TodoListAppBar currentUser={currentUser} />
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
