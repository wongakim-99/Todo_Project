import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const TodoItemInputField = (props) => {
  const [input, setInput] = useState("");

  const onSubmit = () => {
    props.onSubmit(input);
    setInput("");
  };

  return (
    <Box sx={{ margin: "auto" }}>
      <Stack direction="row" spacing={2} justifyContent="center">
        <TextField
          id="todo-item-input"
          label="오늘의 일정추가"
          variant="outlined"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <Button variant="outlined" onClick={onSubmit}>
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default TodoItemInputField;
