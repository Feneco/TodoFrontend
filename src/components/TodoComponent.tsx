import { useState, useMemo } from "react";
import getTodos from "../api/endpoints/todo/getTodos";
import Todo from "../api/models/Todo";
import TodoListItem from "./TodoListItem";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
          setResults(response.filter((e) => {return !e.done} ));
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
          <Button onClick={() => setLoadingTodos(true)}>Reload todos</Button>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
            >
              <Typography>Add new Todo</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <AddTodoForm/>
            </AccordionDetails>
          </Accordion>
        </Stack>

        <Divider />

        {errorLoading ? "Cant load todos" : null}
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
                <ListItem key={i}>
                  <TodoListItem todo={result} />
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
