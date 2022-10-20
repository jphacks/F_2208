import Checkbox from "@mui/material/Checkbox";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { css } from "@emotion/react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ControlPointDuplicateIcon from "@mui/icons-material/ControlPointDuplicate";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { DeleteTask } from "./DeleteTask";

const TaskItem = ({ tasks, setTasks, task, handleToggleCheckbox, checked }) => {
  const [show, setShow] = useState(false);

  const handleClickOpen = () => {
    setShow(!show);
  };

  const handleClickEdit = (task) => {
    alert("edit");
  };

  return (
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
      <Grid item xs={8} onClick={handleClickOpen}>
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
                  ? `${task.time_limit.slice(0, -3)}:00`
                  : "なし"}
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </Grid>
      <Grid item xs={2}>
        <Stack
          spacing={0.5}
          css={css`
            align-items: end;
            padding-right: 10px;
          `}
        >
          <EditIcon
            onClick={() => handleClickEdit(task)}
            css={css`
              color: #e29090;
            `}
          />
          <DeleteTask setTasks={setTasks} tasks={tasks} id={task.id} />
        </Stack>
      </Grid>
      <Grid
        container
        css={css`
          max-height: ${show ? "100vh" : 0};
          transition: max-height 0.7s, padding 0.5s;
          overflow: hidden;
          padding: ${show ? "20px 0 0" : 0};
        `}
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
                割り当て元ユーザ
              </Typography>
              <Typography variant="body1" color="text.primary">
                {task.order_user.name}
              </Typography>
            </Stack>
            <Stack spacing={0.3}>
              <Typography variant="body2" color="text.primary">
                作成日時
              </Typography>
              <Typography variant="body1" color="text.primary">
                {task.created_at.slice(0, -3)}:00
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TaskItem;
