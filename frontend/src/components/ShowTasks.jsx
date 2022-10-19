import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTask, deleteTask, fetchTasks } from '../api/task';
import { Button, Typography } from '@mui/material';
import { userContext } from '../contexts/userContext';
import { useContext, useEffect, useState } from 'react';
import { AddTaskModal } from './AddTaskModal';

export const ShowTasks = () => {
  const { user } = useContext(userContext);
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState();
  const [change, setChange] = useState(false);
  useEffect(() => {
    (async () => {
      /*const createdTask = await createTask(
        "ハッカソン終了",
        "description",
        10,
        "2022-10-22 14:00:00",
        1,
        1,
        1,
        1
      );
      console.log(createdTask);*/
      const res = await fetchTasks();
      console.log(res);
      setTasks(res.data);
    })();
  }, [open, change]);
  console.log(tasks);

  const handleClick = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  const handleChange = () => {
    setChange(! change);
  }


  if (!!tasks) {
    return (<>
      <List sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper' }}>
        {Object.entries(tasks).map(([key, task]) => {
          const labelId = `list-label-${task.id}`;

          return (

            <ListItem
              key={task.id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => { deleteTask(task.id);handleChange(); }} >
                  <DeleteIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemText primary={`タスク: ${task.title}`}
                secondary={
                  <>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {`ポイント: ${task.exp}`}
                    </Typography>
                    {`期限: ${task.time_limit.slice(0, -3)}`}
                  </>
                }
                primaryTypographyProps={{
                  color: task.severity > 2 ? "#d50000" : task.severity > 1 ? "#ff8f00" : "#212121",
                  fontWeight: 'medium',
                  variant: 'body2',
                }}
              />
            </ListItem>
          );
        })}
      </List>
      <Button variant="contained" color="primary" onClick={handleClick}>AddTaskModal</Button>
      <AddTaskModal open={open} handleClose={handleClose} />
    </>
    );
  }
}   