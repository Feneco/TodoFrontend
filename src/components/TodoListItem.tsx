import Todo from "../api/models/Todo";
import Button from "@mui/material/Button";
import "./TodoListItem.css";

interface Props {
  todo: Todo;
}

function TodoListItem({ todo }: Props) {
  return (
    <div className="todoListItem">
      <div className="name">{todo.done ? "Done!" : null} {todo.name}</div>
      <div className="desc">{todo.description}</div>
      { todo.done ? null : <Button variant="contained">Mark as done</Button>}
      <div className="details">
        <div>{todo.project ?? ""}</div>
        <div>
          {todo.to_date === null ? null : "Assigned date " + todo.to_date}
        </div>
        <div>Published on {todo.pub_date}</div>
      </div>
    </div>
  );
}

export default TodoListItem;
