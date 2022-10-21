import { useContext, useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Stack,
  Slider,
  IconButton,
  Typography,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { fetchTasks, updateTask } from "../../api/task";
import { useForm } from "react-hook-form";
import ja from "date-fns/locale/ja";
import { css } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import { userContext } from "../../contexts/userContext";
import { Controller } from "react-hook-form";
import EditIcon from "@mui/icons-material/Edit";
import Tasks from "../../pages/Tasks";
import { getTimestamp } from "../../libs/getTimestamp";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  // maxWidth: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const closeButtonStyle = {
  height: 0,
  textAlign: "right",
};

export const EditTask = ({ setTasks, task }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { user } = useContext(userContext);
  // Task記録
  const { handleSubmit, control, errors } = useForm();
  // modalカレンダー
  const [date, setDate] = useState(dayjs(new Date()));
  const handleChange = (newDate) => {
    setDate(newDate);
  };
  // モーダル優先度
  const valuePriority = (priority) => {
    return `${priority}`;
  };

  const onSubmit = async (inputData) => {
    const resTask = await updateTask({
      id: task.id,
      title: inputData.title,
      description: inputData.description,
      exp: inputData.exp,
      time_limit: getTimestamp(date),
      severity: inputData.severity,
      user_id: user.id, // user_id -> email
    });
    console.log(resTask);
    if (resTask.status === 200) {
      const resUser = await fetchTasks();
      if (resUser.status === 200) {
        setTasks(resUser.data);
      }
    }
    handleClose();
  };

  if (user) {
    return (
      <Box>
        <EditIcon
          onClick={handleClick}
          css={css`
            color: #e29090;
          `}
        />
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <Box sx={style}>
            <Box
              sx={closeButtonStyle}
              css={css`
                margin-bottom: 0.5em;
              `}
            >
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <div
              css={css`
                margin-bottom: 1em;
              `}
            >
              タスクの追加
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: "タスク名を入力してください" }}
                  defaultValue={task.title}
                  render={({ field, fieldState }) => (
                    <TextField
                      inputProps={{ style: { backgroundColor: "#fff" } }}
                      {...field}
                      type="text"
                      label="タスク名"
                      variant="outlined"
                      error={fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: false }}
                  defaultValue={task.description}
                  render={({ field, fieldState }) => (
                    <TextField
                      inputProps={{ style: { backgroundColor: "#fff" } }}
                      {...field}
                      type="text"
                      label="説明"
                      multiline
                      rows={3}
                      variant="outlined"
                      error={fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
                <Controller
                  name="time_limit"
                  control={control}
                  rules={{ required: "期限を選択してください" }}
                  defaultValue={task.time_limit}
                  render={({ field, fieldState }) => (
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale={ja}
                    >
                      <DateTimePicker
                        inputProps={{ style: { backgroundColor: "#fff" } }}
                        label="期限"
                        inputFormat="YYYY-MM-DD hh:mm"
                        {...field}
                        minDate={new Date()}
                        value={date}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                        variant="outlined"
                        error={fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    </LocalizationProvider>
                  )}
                />
                <Controller
                  name="severity"
                  control={control}
                  rules={{ required: "優先度を入力してください" }}
                  defaultValue={task.severity}
                  render={({ field, fieldState }) => (
                    <Box>
                      <Typography
                        variant="body2"
                        css={css`
                          color: rgba(0, 0, 0, 0.6);
                        `}
                      >
                        優先度
                      </Typography>
                      <Slider
                        aria-label="Temperature"
                        {...field}
                        inputProps={{ style: { backgroundColor: "#fff" } }}
                        getAriaValueText={valuePriority}
                        valueLabelDisplay="auto"
                        step={1}
                        marks={[
                          {
                            value: 1,
                            label: "低",
                          },
                          {
                            value: 2,
                            label: "中",
                          },
                          {
                            value: 3,
                            label: "高",
                          },
                        ]}
                        min={1}
                        max={3}
                        sx={"color:#ff0d72;"}
                        error={fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    </Box>
                  )}
                />
                <Controller
                  name="exp"
                  control={control}
                  defaultValue={task.exp}
                  rules={{ required: "報酬を入力してください" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      inputProps={{ style: { backgroundColor: "#fff" } }}
                      {...field}
                      type="number"
                      label="報酬"
                      variant="outlined"
                      error={fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
                <Controller
                  name="user_id"
                  control={control}
                  defaultValue={task.user.email}
                  rules={{
                    required:
                      "割当先ユーザー (メールアドレス)を入力してください",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "メールアドレスの形式が正しくありません",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      inputProps={{ style: { backgroundColor: "#fff" } }}
                      {...field}
                      type="email"
                      label="割当先ユーザー (メールアドレス)"
                      variant="outlined"
                      error={fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
                <Button
                  css={css`
                    color: #fff;
                    background-color: #ff0d72;
                    opacity: 0.8;
                    &:hover {
                      color: #ff0d72;
                      background-color: #dc8ba7;
                      opacity: 0.8;
                      border-color: #ff0d72;
                    }
                  `}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  追加する
                </Button>
              </Stack>
            </form>
          </Box>
        </Modal>
      </Box>
    );
  }
};
