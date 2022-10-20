import { useContext, useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Stack,
  Slider,
  FormGroup,
  IconButton,
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
  const { register, handleSubmit } = useForm();

  // modalカレンダー
  const [date, setDate] = useState(dayjs(new Date()));
  const handleChange = (newDate) => {
    setDate(newDate);
  };
  // モーダル優先度
  const valuePriority = (priority) => {
    return `${priority}`;
  };

  // const onSubmit = (inputData) => console.log(inputData.title, inputData.description, inputData.exp, inputData.time_limit, inputData.severity, 1, inputData.user_id, 1);
  const onSubmit = async (inputData) => {
    await createTask(
      inputData.title,
      inputData.description,
      inputData.exp,
      `${inputData.time_limit}:00`,
      inputData.severity,
      1, // active
      1, // user_id -> email
      user.id
    );
    const res = await fetchTasks();
    if (res.status === 200) {
      setTasks(res.data);
    }
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
            <Box sx={closeButtonStyle}>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <div>タスクの追加</div>
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  id="newTaskTitle"
                  label="タスク名"
                  variant="outlined"
                  fullWidth
                  name="title"
                  {...register("title")}
                />
                <br />
                <TextField
                  id="newDescription"
                  label="説明"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  name="description"
                  {...register("description")}
                />
                <br />
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale={ja}
                >
                  <Stack spacing={3}>
                    <DateTimePicker
                      label="期限選択"
                      minDate={new Date()}
                      value={date}
                      onChange={handleChange}
                      inputFormat="YYYY-MM-DD hh:mm"
                      renderInput={(params) => <TextField {...params} />}
                      name="time_limit"
                      {...register("time_limit")}
                    />
                  </Stack>
                </LocalizationProvider>
                <br />
                <Slider
                  aria-label="Temperature"
                  defaultValue={1}
                  getAriaValueText={valuePriority}
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={1}
                  max={3}
                  name="severity"
                  {...register("severity")}
                />
                <br />
                <TextField
                  id="newReward"
                  label="報酬"
                  variant="outlined"
                  defaultValue={100}
                  fullWidth
                  name="exp"
                  {...register("exp")}
                />
                <br />
                <TextField
                  id="newAssign"
                  label="割当先ユーザー (メールアドレス)"
                  variant="outlined"
                  defaultValue={user.email}
                  fullWidth
                  name="user_id"
                  {...register("user_id")}
                />
                <br />
                <Button variant="contained" color="primary" type="submit">
                  追加する
                </Button>
              </FormGroup>
            </form>
          </Box>
        </Modal>
      </Box>
    );
  }
};
