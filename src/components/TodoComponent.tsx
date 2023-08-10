import { useState, useMemo } from "react";
import getTodos from "../api/endpoints/todo/getTodos";
import Todo from "../api/models/Todo";
import TodoListItem from "./TodoListItem";
import {
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

  const reloadTodos = () => { setLoadingTodos(true) }

  const [modalFormOpen, setModalFormOpen] = useState(false);
  const openAddTodoModal  = () => { setModalFormOpen(true)  }
  const closeAddTodoModal = () => { setModalFormOpen(false) }

  return (
    <Container>
      <Stack spacing={3}>

        <Typography variant="h2" color="text.primary">
          Todos:
        </Typography>

        <Stack spacing={2}>
          <Button onClick={reloadTodos}>Reload todos</Button>
          <Button onClick={openAddTodoModal}>Add todo</Button>
        </Stack>
        <AddTodoForm open={modalFormOpen} onClose={closeAddTodoModal}/>
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
            results?.map((result) => {
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
