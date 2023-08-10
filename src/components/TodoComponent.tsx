import { useState, useMemo } from "react";
import getTodos from "../api/endpoints/todo/getTodos";
import Todo from "../api/models/Todo";
import TodoListItem from "./TodoListItem";
import {
  Alert,
  AlertColor,
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
import addTodo from "../api/endpoints/todo/addTodo";
import AppSnackBar from "./AppSnackBar";

function TodoComponent() {
  /* Todo list hooks and funcs #################################################### */
  const [results, setResults] = useState<Todo[]>();
  const [loadingTodos, setLoadingTodos] = useState(true);
  const [errorLoading, setErrorLoading] = useState(false);
  const reloadTodos = () => { setLoadingTodos(true) }

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
          openSnackBar("Can't load todos! Can't connect to server", "error")
          setLoadingTodos(false);
        })
        .finally(() => {
          setLoadingTodos(false);
        });
    }
  }, [loadingTodos, results?.length]);

  /* Add Todo Modal states and funcs #################################################### */
  const [modalFormOpen, setModalFormOpen] = useState(false);
  const openAddTodoModal  = () => { setModalFormOpen(true)  }
  const closeAddTodoModal = () => { setModalFormOpen(false) }
  
  /* snackBar hooks and funcs #################################################### */
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarText, setSnackBarText] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState<AlertColor>();

  const openSnackBar = (message: string, severity?: AlertColor) => {
    setSnackBarText(message);
    setSnackBarSeverity(severity);
    setSnackBarOpen(true);
  };

  const handleSnackBarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarOpen(false);
  };

  return (
    <Container>
      <AppSnackBar
        open={snackBarOpen}
        text={snackBarText}
        severity={snackBarSeverity}
        onClose={handleSnackBarClose}
      />
      <Stack spacing={3}>

        <Typography variant="h2" color="text.primary">
          Todos:
        </Typography>

        <Stack spacing={2}>
          <Button onClick={reloadTodos}>Reload todos</Button>
          <Button onClick={openAddTodoModal}>Add todo</Button>
        </Stack>
        <AddTodoForm open={modalFormOpen} onClose={closeAddTodoModal} addTodo={addTodo} openSnackBar={openSnackBar}/>
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
                  <TodoListItem 
                    todo={result} 
                    onConfirmDelete={() => {
                      reloadTodos(); 
                      openSnackBar("Deleted Todo successfully")
                    }}/>
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
