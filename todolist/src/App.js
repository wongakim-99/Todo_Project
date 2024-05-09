import "./App.css";
import TodoItemInputField from "./TodoItemInputField";
import TodoItemList from "./TodoItemList";

const App = () => {
  return (
    <div className="App">
      <TodoItemInputField onSubmit={() => {}} />
      <TodoItemList todoItemList={[]} />
    </div>
  );
};

export default App;
