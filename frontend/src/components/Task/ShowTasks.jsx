import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export const ShowTasks = ({ tasks }) => {

  return (
    <List sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper' }}>
      {Object.entries(tasks).map(([key, task]) => {
        const labelId = `list-label-${task.id}`;
        return (
          <ListItem
            key={task.id}
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemText primary={`タスク: ${task.title}   期限: ${task.time_limit}   ポイント: ${task.exp}`} />
          </ListItem>
        );
      })}
    </List>
  );
}