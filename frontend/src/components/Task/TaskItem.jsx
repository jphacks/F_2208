import Checkbox from "@mui/material/Checkbox";
import { Avatar, Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { css } from "@emotion/react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ControlPointDuplicateIcon from "@mui/icons-material/ControlPointDuplicate";
import { useContext, useState } from "react";
import { DeleteTask } from "./DeleteTask";
import { EditTask } from "./EditTask";
import { userContext } from "../../contexts/userContext";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PigImage from "../../assets/img/pig.png";

const TaskItem = ({
  tasks,
  setTasks,
  task,
  handleToggleCheckbox,
  checked,
  friends,
  setFriends,
  showMyTasks,
}) => {
  const [show, setShow] = useState(false);
  const { user } = useContext(userContext);

  const handleClickOpen = () => {
    setShow(!show);
  };
  const changeJSTDate = (date) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    const dayOfWeek = "日月火水木金土".charAt(newDate.getDay());

    const hour = (`0` + newDate.getHours()).slice(-2);
    const minute = (`0` + newDate.getMinutes()).slice(-2);
    return `${year}/${month}/${day} (${dayOfWeek}) ${hour}:${minute}`;
  };

  return (
    <Grid container>
      <Grid item xs={2}></Grid>
      <Grid item xs={10}>
        <Stack direction="row" spacing={0.5} alignItems="center">
          {showMyTasks && user && task.order_user.id !== user.id && (
            <>
              <Avatar
                src={PigImage}
                css={css`
                  width: 18px;
                  height: 18px;
                `}
              />
              <Typography variant="caption">
                {task.order_user.name} さんが割り当てました
              </Typography>
            </>
          )}
          {!showMyTasks && (
            <>
              <Avatar
                src={PigImage}
                css={css`
                  width: 18px;
                  height: 18px;
                `}
              />
              <Typography variant="caption">
                {task.user.name} さんへ割り当てました
              </Typography>
            </>
          )}
        </Stack>
      </Grid>
      <Grid
        key={task.id}
        container
        alignItems="center"
        css={css`
          &:hover {
            cursor: pointer;
          }
        `}
      >
        <Grid item xs={2}>
          <Checkbox
            edge="end"
            onChange={() => handleToggleCheckbox(task)}
            checked={task.status === 2 || checked.indexOf(task.id) !== -1}
            inputProps={{ "aria-labelledby": task.title }}
            css={css`
              &.Mui-checked {
                color: #fe3e83;
              }
            `}
          />
        </Grid>
        <Grid
          item
          xs={!showMyTasks || task.order_user_id === user?.id ? 8 : 10}
          onClick={handleClickOpen}
        >
          <Stack spacing={0.5}>
            <Typography
              variant="h6"
              css={css`
                color: ${task.severity > 2
                  ? "#d50000"
                  : task.severity > 1
                  ? "#ff8f00"
                  : "#212121"};
              `}
            >
              {task.title}
            </Typography>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="body2"
                  color="text.primary"
                  css={css`
                    display: flex;
                    justify-content: start;
                    align-items: center;
                    gap: 0.5em;
                  `}
                >
                  <ControlPointDuplicateIcon fontSize="small" />
                  <span>
                    {task.exp}
                    <span
                      css={css`
                        font-size: 0.6em;
                      `}
                    >
                      {" "}
                      Exp
                    </span>
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="body2"
                  color="text.primary"
                  css={css`
                    display: flex;
                    justify-content: start;
                    align-items: center;
                    gap: 0.5em;
                  `}
                >
                  <AccessTimeIcon fontSize="small" />
                  {task.time_limit
                    ? `${changeJSTDate(task.time_limit)}`
                    : "なし"}
                </Typography>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
        {(!showMyTasks || task.order_user_id === user?.id) && (
          <Grid item xs={2}>
            <Stack
              spacing={0.5}
              css={css`
                align-items: end;
                padding-right: 10px;
              `}
            >
              <>
                <EditTask
                  setTasks={setTasks}
                  task={task}
                  friends={friends}
                  setFriends={setFriends}
                  showMyTasks={showMyTasks}
                />
                <DeleteTask
                  setTasks={setTasks}
                  id={task.id}
                  showMyTasks={showMyTasks}
                />
              </>
            </Stack>
          </Grid>
        )}
        <Grid
          container
          css={css`
            max-height: ${show ? "100vh" : 0};
            transition: max-height 0.7s, padding 0.5s;
            overflow: hidden;
            padding: ${show ? "20px 0 0" : 0};
          `}
          onClick={handleClickOpen}
        >
          <Grid item xs={2}></Grid>
          <Grid item xs={10}>
            <Stack spacing={3}>
              <Stack spacing={0.3}>
                <Typography variant="body2" color="text.primary">
                  説明
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {task.description}
                </Typography>
              </Stack>
              <Stack spacing={0.3}>
                <Typography variant="body2" color="text.primary">
                  作成者
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar
                    src={PigImage}
                    css={css`
                      width: 25px;
                      height: 25px;
                    `}
                  />
                  <Stack direction="column" spacing={0} alignItems="start">
                    <Typography variant="body1" color="text.primary">
                      {task.order_user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {task.order_user.email}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
              <Stack spacing={0.3}>
                <Typography variant="body2" color="text.primary">
                  作成日時
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {changeJSTDate(task.created_at)}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TaskItem;
