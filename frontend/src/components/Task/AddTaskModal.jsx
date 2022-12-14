import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Stack,
  Slider,
  FormGroup,
  IconButton,
  inputAdornmentClasses,
  Typography,
  Autocomplete,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { createTask, fetchTasks } from "../../api/task";
import { useForm } from "react-hook-form";
import ja from "date-fns/locale/ja";
import { css } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import { userContext } from "../../contexts/userContext";
import { Controller } from "react-hook-form";
import { getTimestamp } from "../../libs/getTimestamp";
import { fetchFriendUsers } from "../../api/friend";

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

export const AddTaskModal = ({ open, handleClose, setTasks }) => {
  const { user } = useContext(userContext);
  // Task記録
  const { handleSubmit, control, errors } = useForm();
  // modalカレンダー
  const [date, setDate] = useState(dayjs(new Date()));
  const [friends, setFriends] = useState([]);
  // 割り当て先ユーザーメールアドレス
  const [assignedEmail, setAssignedEmail] = useState();

  useEffect(() => {
    (async () => {
      const res = await fetchFriendUsers();
      if (res.status === 200) {
        setFriends([...res.data, user]);
      }
    })();
  }, [user]);

  const handleChange = (newDate) => {
    setDate(newDate);
  };
  // モーダル優先度
  const valuePriority = (priority) => {
    return `${priority}`;
  };

  const onSubmit = async (inputData) => {
    let user_id = user.id; // デフォルトで自身のユーザID
    user_id =
      friends.filter((friend) => assignedEmail === friend.email)[0]?.id ||
      user_id;

    const resTask = await createTask({
      title: inputData.title,
      description: inputData.description,
      exp: inputData.exp,
      time_limit: getTimestamp(date),
      severity: inputData.severity,
      user_id: user_id,
    });
    // console.log(resTask);
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
                  defaultValue={new Date()}
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
                  defaultValue={1}
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
                        min={1}
                        max={3}
                        sx={"color:#ff0d72;"}
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
                        error={fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    </Box>
                  )}
                />
                <Controller
                  name="exp"
                  control={control}
                  defaultValue={100}
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
                  name="email"
                  control={control}
                  defaultValue={user.email}
                  rules={{
                    required:
                      "割当先ユーザー (メールアドレス)を入力してください",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "メールアドレスの形式が正しくありません",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <Autocomplete
                      {...field}
                      type="email"
                      value={assignedEmail}
                      inputValue={assignedEmail}
                      onChange={(event, newValue) => {
                        setAssignedEmail(newValue);
                      }}
                      // inputValue={inputValue}
                      // onInputChange={(event, newInputValue) => {
                      //   setInputValue(newInputValue);
                      // }}
                      error={fieldState.error}
                      helperText={fieldState.error?.message}
                      options={friends.map((friend) => friend?.email)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="割当先ユーザー (メールアドレス)"
                        />
                      )}
                    />
                  )}
                />
                <Button
                  css={css`
                    color: #fff;
                    background-color: #ff0d72;
                    opacity: 0.8;
                    &:hover {
                      color: #fff;
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
