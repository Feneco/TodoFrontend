import BaseApiUrl from "../../../constants/BaseApiUrl";

async function deleteTodo(id: number) {
  let response = await fetch(`${BaseApiUrl}${id}/`, {
    method: "Delete",
  });

  return response;
}

export default deleteTodo;
