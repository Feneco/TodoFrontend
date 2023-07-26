import BaseApiUrl from "../../../constants/BaseApiUrl";
import Todo from "../../models/Todo";

async function getTodos(): Promise<Todo[]> {
  let response = await fetch(`${BaseApiUrl}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("HTTP error");
  }

  let text = (await response.json()) as Todo[];
  return text;
}

export default getTodos;
