/* eslint-disable react/prop-types */
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';

// components
import Iconify from '../iconify';

export default function TodoItem({ todo, onDelete }) {
  return (
    <ListItem>
      <ListItemText primary={todo.title} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(todo.id)}>
          <Iconify icon="material-symbols:delete" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
