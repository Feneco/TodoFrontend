import BaseApiUrl from "../../../constants/BaseApiUrl";
import Todo from "../../models/Todo";

async function getTodos(): Promise<Todo[]> {
  // let response = await fetch(`${BaseApiUrl}/todo/`, {
  //   method: "GET",
  // });

  // if (!response.ok) {
  //   throw new Error("HTTP error");
  // }

  // let text = (await response.json()) as Todo[];
  // return text;

  return [
    {
      id: 1,
      name: "Teste 1",
      description: "Primeiro teste feito no negócio",
      done: false,
      pub_date: new Date(),
    },
    {
      id: 2,
      name: "Teste 2",
      description: "Segundo teste feito",
      done: false,
      pub_date: new Date(),
      to_date: new Date(2023, 7, 29, 18, 53),
    },
    {
      id: 3,
      name: "Teste 3",
      description: "Terceiro teste. Lorem ipsum dolor sit amet.",
      done: true,
      pub_date: new Date(),
      to_date: new Date(2023, 7, 25, 6, 28),
    },
    {
      id: 4,
      name: "Teste 4",
      description: "Quarto teste. Lorem ipsum dolor sit amet.",
      done: false,
      pub_date: new Date(),
      to_date: new Date(2023, 8, 1, 16, 0),
    },
    {
      id: 5,
      name: "Teste 5",
      description: "Quinto teste. Lorem ipsum dolor sit amet.",
      done: true,
      pub_date: new Date(),
    },
  ];
}

export default getTodos;
