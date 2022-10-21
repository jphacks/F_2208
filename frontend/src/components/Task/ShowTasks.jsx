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
import PigImage from "../../assets/img/pig.png";

export const ShowTasks = ({
  limited = false,
  showMore = false,
  hideDoneTask = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);
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
      const resMyTasks = await fetchTasks();
      setMyTasks(resMyTasks.data);
      const resOrderedTasks = await fetchOrderedTasks();
      setOrderedTasks(resOrderedTasks.data);

      setIsLoading(false);
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

  if (isLoading) {
    // if (true) {
    return (
      <ShadowBox>
        <Box
          css={css`
            padding: 30px 10px;
            height: 40vh;
          `}
        >
          <Stack
            spacing={2}
            css={css`
              height: 100%;
            `}
          >
            <Grid container alignItems="center">
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
                <Typography variant="h5" align="center">
                  マイタスク
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
                />
              </Grid>
            </Grid>
            <Stack
              spacing={2}
              divider={<Divider />}
              css={css`
                height: 100%;
              `}
            >
              <Button
                variant="contained"
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
              <Box
                css={css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100%;
                `}
              >
                <img
                  src={PigImage}
                  css={css`
                    display: block;
                    width: 45%;
                    @media screen and (min-width: 768px) {
                      width: 35%;
                    }
                    animation-name: korokoro;
                    animation-duration: 1s;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                    @keyframes korokoro {
                      0% {
                        transform: translate(0%, 0%);
                      }
                      5% {
                        transform: translate(10%, 0%) rotate(10deg);
                      }
                      25% {
                        transform: translate(20%, 0%) rotate(20deg);
                      }
                      30% {
                        transform: translate(-10%, 0%) rotate(-10deg);
                      }
                      35% {
                        transform: translate(-15%, 0%) rotate(-15deg);
                      }
                      45% {
                        transform: translate(10%, 0%) rotate(10deg);
                      }
                      50% {
                        transform: translate(15%, 0%) rotate(15deg);
                      }
                      60% {
                        transform: translate(-5%, 0%) rotate(-5deg);
                      }
                      65% {
                        transform: translate(-7%, 0%) rotate(-7deg);
                      }
                      75% {
                        transform: translate(0%, 0%) rotate(0deg);
                      }
                      100% {
                        transform: translate(0%, 0%) rotate(0deg);
                      }
                    }
                  `}
                />
              </Box>
            </Stack>
          </Stack>
        </Box>
      </ShadowBox>
    );
  }

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
                      color: #fff;
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
