import { useState, useMemo } from "react";
import getTodos from "../api/endpoints/todo/getTodos";
import Todo from "../api/models/Todo";
import TodoListItem from "./TodoListItem";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import AddTodoForm from "./AddTodoForm";
import { ExpandMore } from "@mui/icons-material";

function TodoComponent() {
  const [results, setResults] = useState<Todo[]>();
  const [loadingTodos, setLoadingTodos] = useState(true);
  const [errorLoading, setErrorLoading] = useState(false);

  useMemo(() => {
    if (loadingTodos) {
      if (results?.length !== 0) {
        setResults([]);
      }
      setErrorLoading(false);
      getTodos()
        .then((response) => {
          setResults(
            response
              .filter((e) => {return !e.done} )
              .reverse());
        })
        .catch((e) => {
          console.log(e);
          setErrorLoading(true);
          setLoadingTodos(false);
        })
        .finally(() => {
          setLoadingTodos(false);
        });
    }
  }, [loadingTodos]);

  const reloadTodos = () => {
    setLoadingTodos(true)
  }

  return (
    <Container>
      <Stack
        spacing={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 500,
          padding: "5pt",
          gap: "10pt",
        }}
      >

        <Typography variant="h2" color="text.primary">
          Todos:
        </Typography>

        <Stack spacing={2}>
          <Button onClick={reloadTodos}>Reload todos</Button>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
            >
              <Typography>Add new Todo</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <AddTodoForm onAdd={reloadTodos}/>
            </AccordionDetails>
          </Accordion>
        </Stack>

        <Divider />

        {errorLoading && <Alert severity="error">"Cant load todos"</Alert> }
        <List>
          {loadingTodos ? (
            <Stack spacing={1}>
              <Typography variant="h1"><Skeleton/></Typography> 
              <Typography variant="caption"><Skeleton/></Typography>
              <Typography variant="body1"><Skeleton/></Typography>
              <Divider/>
              <Skeleton width={80} height={50}/>
            </Stack>
          ) : (
            results?.map((result, i) => {
              return (
                <ListItem key={result.id}>
                  <TodoListItem todo={result} onConfirmDelete={reloadTodos}/>
                </ListItem>
              );
            })
          )}
        </List>
        
      </Stack>
    </Container>
  );
}

export default TodoComponent;
