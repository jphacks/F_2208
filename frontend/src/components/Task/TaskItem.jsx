import Checkbox from "@mui/material/Checkbox";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { css } from "@emotion/react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ControlPointDuplicateIcon from "@mui/icons-material/ControlPointDuplicate";
import { useState } from "react";

const TaskItem = ({ task, handleToggleCheckbox, checked }) => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
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
        />
      </Grid>
      <Grid item xs={10} onClick={handleClick}>
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
                {task.time_limit.slice(0, -3)}:00
              </Typography>
            </Grid>
          </Grid>
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