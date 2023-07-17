import { Add, Javascript } from "@mui/icons-material";
import { Card, Fab, Stack, TextField, FormControl } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import addTodo, { TodoAdd } from "../api/endpoints/todo/addTodo";

function AddTodoForm() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);

  const checkInvalid = (x: string) => {
    return x.length <= 0 || x.length > 256;
  };

  const postTodo = (todo: TodoAdd) => {
    if (!checkInvalid(todo.name) && !checkInvalid(todo.description)) {
      addTodo(todo);
    } else {
      alert("aaa");
    }
  };

  return (
    <Card
      component="form"
      sx={{
        width: "100%",
        padding: "10pt",
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl>
        <Stack gap={2}>
          <TextField
            label="Name"
            variant="outlined"
            onChange={(e) => {
              setName(e.target.value);
            }}
            error={checkInvalid(name)}
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            error={checkInvalid(description)}
            required
          />
          <DateTimePicker
            label="Due date"
            onChange={(newValue: Date | null) => {
              if (newValue == null) {
                // Null date
                setDate(undefined);
                return;
              }
              let testValue = new Date(newValue);
              if (
                typeof testValue.getFullYear === "function" &&
                !isNaN(testValue.valueOf())
              ) {
                setDate(testValue);
              } else {
                setDate(undefined);
              }
            }}
          />
          <Fab
            color="primary"
            aria-label="add"
            type="button"
            onClick={() => {
              let post: TodoAdd = { name: name, description: description };
              if ( date != null ) {
                post.dueDate = date;
              }
              postTodo(post);
            }}
          >
            <Add />
          </Fab>
        </Stack>
      </FormControl>
    </Card>
  );
}

export default AddTodoForm;
