import BaseApiUrl from "../../../constants/BaseApiUrl";
import Todo from "../../models/Todo";

export interface TodoAdd {
  name: string;
  description: string;
  dueDate?: Date;
}

async function addTodo(todo: TodoAdd) {
  // let response = await fetch(`${BaseApiUrl}/todo/add`, {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(todo)
  // });

  // if (!response.ok) {
  //   let responseBody = await response.json()
  //   throw new Error(`Cant add new todo ${responseBody}`);
  // }

  // return true;
  console.log("%c AddTodo():", "color: cyan")
  console.log({todo});
  return true;
}

export default addTodo;
