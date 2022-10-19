import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../api/auth";
import {
  createTask,
  deleteTask,
  fetchTask,
  fetchTasks,
  updateTask,
} from "../api/task";
import { AddTaskModal } from "../components/Task/AddTaskModal";
import { ShowTasks } from "../components/Task/ShowTasks";
import Layout from "../components/Layout";

const Tasks = () => {
  const navigate = useNavigate();
  useEffect(() => {
    auth(navigate);
  }, []);

  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState();

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
  }, [open]);
  console.log(tasks);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Layout>
      {/* {!!tasks &&
        Object.entries(tasks).map(([key, value]) => (
          <Typography key={value.title}>{value.title}</Typography>
        ))} */}
      {!!tasks ? (
        <ShowTasks tasks={tasks} />
      ) : (
        <Typography>タスクが見つかりません</Typography>
      )}
      <Button variant="contained" color="primary" onClick={handleClick}>
        AddTaskModal
      </Button>
      <AddTaskModal open={open} handleClose={handleClose} />
    </Layout>
  );
};

export default Tasks;
