import BaseApiUrl from "../../../constants/BaseApiUrl";
import Todo from "../../models/Todo";

export type addTodoInterface = Omit<Todo, "id" | "done" | "pub_date">

async function addTodo(todo: addTodoInterface) {

  const response = await fetch(`${BaseApiUrl}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  return response;
}

export default addTodo;
