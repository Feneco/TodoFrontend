import Todo from "../api/models/Todo";
import Button from "@mui/material/Button";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Typography,
} from "@mui/material";

interface Props {
  todo: Todo;
}

function TodoListItem({ todo }: Props) {
  const publicationDate = new Date(todo.pub_date);
  let assignedDate: Date | null = null;
  if (todo.to_date !== undefined && todo.to_date !== null) {
    assignedDate = new Date(todo.to_date);
  }

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        title={
          <div style={{ gap: "10pt", display: "flex" }}>
            {todo.name}
            {todo.done ? <Chip label="Done" color="success" /> : null}
          </div>
        }
        subheader={
          assignedDate === null ? null : (
            <Typography variant="caption">
              due {assignedDate.toDateString()}
            </Typography>
          )
        }
      />
      <CardContent>
        <Typography variant="body1">{todo.description}</Typography>
        <Divider />
        <Typography variant="caption">
          Created at {publicationDate.toDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        {!todo.done ? <Button>Mark as done</Button> : null}
      </CardActions>
    </Card>
  );
}

export default TodoListItem;
