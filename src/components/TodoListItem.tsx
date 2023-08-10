import Todo from "../api/models/Todo";
import Button from "@mui/material/Button";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import deleteTodo from "../api/endpoints/todo/deleteTodo";

interface Props {
  todo: Todo;
  onConfirmDelete?: () => void;
}

function TodoListItem({ todo, onConfirmDelete }: Props) {
  const publicationDate = new Date(todo.pub_date);
  let assignedDate: Date | null = null;
  if (todo.to_date !== undefined && todo.to_date !== null) {
    assignedDate = new Date(todo.to_date);
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogClickOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Card sx={{ width: "100%" }}>
      {/* TODO: This dialog should probably be a separate component */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirm delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Really delete the Todo? This can't be undone!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            Disagree
          </Button>
          <Button
            onClick={() => {
              handleDialogClose();
              deleteTodo(todo.id).then(() => {
                onConfirmDelete?.();
              }).catch((e) => { throw e})
            }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <CardHeader
        title={
          <div style={{ gap: "10pt", display: "flex" }}>
            {todo.name}
            {todo.done ? <Chip label="Done" color="success" /> : null}
          </div>
        }
        action={
          <div>
            <IconButton aria-label="settings" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  handleDialogClickOpen();
                }}
              >
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
            </Menu>
          </div>
        }
        subheader={
          assignedDate && (
            <Typography variant="caption">
              due {assignedDate.toDateString()}
            </Typography>
          )
        }
      />
      <CardContent>
        {todo.description && (
          <Typography variant="body1" sx={{overflowWrap:"break-word"}}>{todo.description}</Typography>
        )}
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
