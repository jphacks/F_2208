import { fetchTasks, updateDoTask, updateUndoTask } from "../../api/task";
import { Box, Button, Divider, Stack } from "@mui/material";
import { userContext } from "../../contexts/userContext";
import { useContext, useEffect, useState } from "react";
import { AddTaskModal } from "./AddTaskModal";
import { css } from "@emotion/react";
import { fetchUser } from "../../api/user";
import TaskItem from "./TaskItem";
import ShadowBox from "../ShadowBox";
import { Link } from "react-router-dom";

export const ShowTasks = ({
  limited = false,
  showMore = false,
  hideDoneTask = false,
}) => {
  const { user, setUser } = useContext(userContext);
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState();

  // map loop count
  let count = 0;

  useEffect(() => {
    (async () => {
      const res = await fetchTasks();
      setTasks(res.data);
    })();
  }, []);
  const [checked, setChecked] = useState([0]);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = async () => {
    setOpen(false);
  };

  const handleToggleCheckbox = async (task) => {
    const currentIndex = checked.indexOf(task.id);
    const newChecked = [...checked];

    switch (task.status) {
      case 1:
        // 完了にする
        const res1 = await updateDoTask({ id: task.id });
        if (res1.status === 200) {
          const resTasks = await fetchTasks();
          setTasks(resTasks.data);
          const resUser = await fetchUser();
          setUser(resUser.data);
          newChecked.push(task.id);
        }
        break;
      case 2:
        // 未完了に戻す
        const res2 = await updateUndoTask({ id: task.id });
        if (res2.status === 200) {
          const resTasks = await fetchTasks();
          setTasks(resTasks.data);
          const resUser = await fetchUser();
          setUser(resUser.data);
          console.log(user);
          newChecked.splice(currentIndex, 1);
        }
    }

    setChecked(newChecked);
  };

  if (!!tasks) {
    return (
      <ShadowBox>
        <Box
          css={css`
            padding: 30px 10px;
          `}
        >
          <AddTaskModal
            open={open}
            handleClose={handleClose}
            setTasks={setTasks}
          />
          <Stack spacing={2} divider={<Divider />}>
            <Button
              variant="contained"
              onClick={handleClick}
              css={css`
                background-color: #f67690;
                opacity:0.8;
                &:hover {background-color: #dc8ba7;}
              `}
            >
              タスクを追加する
            </Button>
            {Object.entries(tasks).map(([key, task]) => {
              if (limited === false || count < limited) {
                // if (hideDoneTask && task.status === 2) {
                //   return;
                // }
                count++;
                return (
                  <TaskItem
                    task={task}
                    handleToggleCheckbox={handleToggleCheckbox}
                    checked={checked}
                    setTasks={setTasks}
                    tasks={tasks}
                  />
                );
              }
            })}
            {showMore && (
              <Button
                variant="outlined"
                color="primary"
                to="/tasks"
                component={Link}
                css={css`
                  color: #ff0d72;
                  border-color: #ff0d72;
                  &:hover {
                    color: #ff0d72;
                    border-color: #ff0d72;
                    opacity:0.6;
                    border-color: #ff0d72;
                  }
                `}
              >
                もっとみる
              </Button>
            )}
          </Stack>
        </Box>
      </ShadowBox>
    );
  }
};
