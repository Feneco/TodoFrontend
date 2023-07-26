import BaseApiUrl from "../../../constants/BaseApiUrl";

export interface addTodoInterface {
  name: string;
  description: string;
  dueDate?: Date;
}

async function addTodo(todo: addTodoInterface) {
  if (todo.dueDate == null) {
    delete todo.dueDate;
  }

  let response = await fetch(`${BaseApiUrl}`, {
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
