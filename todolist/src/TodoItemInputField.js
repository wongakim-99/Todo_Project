import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const TodoItemInputField = (props) => {
  const [input, setInput] = useState("");
  return (
    <div>
      <TextField
        id="todo-item-input"
        label="Todo Item"
        variant="outlined"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <Button variant="outlined">Submit</Button>
    </div>
  );
};

export default TodoItemInputField;
