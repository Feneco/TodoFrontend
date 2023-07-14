// import React from "react";
import { useState, useEffect } from "react";
import getTodos from "../api/endpoints/getTodos";
import Todo from "../api/models/Todo";
import TodoListItem from "../components/TodoListItem";
import "./Root.css";

function Root() {
  const [results, setResults] = useState<Todo[]>();
  const [loadingTodos, setLoadingTodos] = useState(true);

  useEffect(() => {
    if (loadingTodos) {
      getTodos()
        .then((response) => {
          setResults(response);
        })
        .finally(() => {
          setLoadingTodos(false);
        });
    }
  }, [loadingTodos]);

  return (
    <div className="wrapper">
      <div className="mainTodo">
        <h1>Todos:</h1>
        <div>
          {loadingTodos
            ? "Loading todos"
            : results?.map((result, i) => {
                return <TodoListItem key={i} todo={result} />;
              })}
        </div>
      </div>
    </div>
  );
}

export default Root;
