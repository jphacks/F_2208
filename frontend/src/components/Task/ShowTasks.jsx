import {
  fetchOrderedTasks,
  fetchTasks,
  updateDoTask,
  updateUndoTask,
} from "../../api/task";
import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import { userContext } from "../../contexts/userContext";
import { useContext, useEffect, useState } from "react";
import { AddTaskModal } from "./AddTaskModal";
import { css } from "@emotion/react";
import { fetchUser } from "../../api/user";
import TaskItem from "./TaskItem";
import ShadowBox from "../ShadowBox";
import { Link } from "react-router-dom";
import { fetchFriendUsers } from "../../api/friend";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

export const ShowTasks = ({
  limited = false,
  showMore = false,
  hideDoneTask = false,
}) => {
  const { user, setUser } = useContext(userContext);
  const [open, setOpen] = useState(false);
  const [myTasks, setMyTasks] = useState();
  const [orderedTasks, setOrderedTasks] = useState();
  const [showMyTasks, setShowMyTasks] = useState(true);
  const [friends, setFriends] = useState([]);

  // map loop count
  let count = 0;

  useEffect(() => {
    (async () => {
      const res = await fetchTasks();
      setMyTasks(res.data);
    })();
    (async () => {
      const res = await fetchOrderedTasks();
      setOrderedTasks(res.data);
    })();
  }, []);
  const [checked, setChecked] = useState([0]);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = async () => {
    setOpen(false);
  };

  const handleClickSwitch = () => {
    setShowMyTasks(!showMyTasks);
  };

  const handleToggleCheckbox = async (task) => {
    const currentIndex = checked.indexOf(task.id);
    const newChecked = [...checked];

    switch (task.status) {
      case 1:
        // 完了にする
        const res1 = await updateDoTask({ id: task.id });
        if (res1.status === 200) {
          if (showMyTasks) {
            const resTasks = await fetchTasks();
            setMyTasks(resTasks.data);
          } else {
            const resTasks = await fetchOrderedTasks();
            setOrderedTasks(resTasks.data);
          }
          const resUser = await fetchUser();
          setUser(resUser.data);
          newChecked.push(task.id);
        }
        break;
      case 2:
        // 未完了に戻す
        const res2 = await updateUndoTask({ id: task.id });
        if (res2.status === 200) {
          if (showMyTasks) {
            const resTasks = await fetchTasks();
            setMyTasks(resTasks.data);
          } else {
            const resTasks = await fetchOrderedTasks();
            setOrderedTasks(resTasks.data);
          }
          const resUser = await fetchUser();
          setUser(resUser.data);
          newChecked.splice(currentIndex, 1);
        }
        break;
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    (async () => {
      const res = await fetchFriendUsers();
      if (res.status === 200) {
        setFriends([...res.data, user]);
      }
    })();
  }, [user]);

  if (!!myTasks && !!orderedTasks) {
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
            setTasks={showMyTasks ? setMyTasks : setOrderedTasks}
          />
          <Stack spacing={2}>
            <Grid container alignItems="center">
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
                <Typography variant="h5" align="center">
                  {showMyTasks ? "マイタスク" : "割り当てタスク"}
                </Typography>
              </Grid>
              <Grid item xs={2} align="end">
                <CompareArrowsIcon
                  fontSize="large"
                  css={css`
                    color: #444;
                    &:hover {
                      cursor: pointer;
                    }
                  `}
                  onClick={handleClickSwitch}
                />
              </Grid>
            </Grid>
            <Stack spacing={2} divider={<Divider />}>
              <Button
                variant="contained"
                onClick={handleClick}
                css={css`
                  background-color: #f67690;
                  opacity: 0.8;
                  &:hover {
                    background-color: #dc8ba7;
                  }
                `}
              >
                タスクを追加する
              </Button>
              {Object.entries(showMyTasks ? myTasks : orderedTasks).map(
                ([key, task]) => {
                  if (limited === false || count < limited) {
                    // if (hideDoneTask && task.status === 2) {
                    //   return;
                    // }
                    count++;
                    return (
                      <TaskItem
                        key={task.id}
                        task={task}
                        handleToggleCheckbox={handleToggleCheckbox}
                        checked={checked}
                        setTasks={showMyTasks ? setMyTasks : setOrderedTasks}
                        tasks={showMyTasks ? myTasks : orderedTasks}
                        friends={friends}
                        setFriends={setFriends}
                        showMyTasks={showMyTasks}
                      />
                    );
                  }
                }
              )}
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
                      opacity: 0.6;
                      border-color: #ff0d72;
                    }
                  `}
                >
                  もっとみる
                </Button>
              )}
            </Stack>
          </Stack>
        </Box>
      </ShadowBox>
    );
  }
};
