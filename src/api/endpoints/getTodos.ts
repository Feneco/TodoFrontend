import BaseApiUrl from "../../constants/BaseApiUrl";
import Todo from "../models/Todo";

async function getTodos() {
  let response = await fetch(`${BaseApiUrl}/todo/`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("HTTP error");
  }

  let text = await response.json() as Todo[];
  return text;
}

export default getTodos;