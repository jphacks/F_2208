import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  IconButton,
  Typography,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { css } from "@emotion/react";
import { deleteTask, fetchOrderedTasks, fetchTasks } from "../../api/task";

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

export const DeleteTask = ({ setTasks, id, showMyTasks }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickDelete = async () => {
    const res = await deleteTask({ id });
    if (res.status === 200) {
      const resTasks = showMyTasks
        ? await fetchTasks()
        : await fetchOrderedTasks();
      setTasks(resTasks.data);
    }
    handleClose();
  };

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
          <Stack spacing={3}>
            <Typography variant="p">本当にタスクを消しますか？</Typography>
            <Button
              css={css`
                color: #fff;
                background-color: #c62828;
                &:hover {
                  color: #fff;
                  background-color: #dc8ba7;
                  opacity: 0.8;
                  border-color: #c62828;
                }
              `}
              variant="contained"
              onClick={handleClickDelete}
            >
              タスクを消す
            </Button>
            <Button
              css={css`
                color: #c62828;
                opacity: 0.8;
                border-color: #c62828;
                &:hover {
                  color: #fff;
                  opacity: 0.8;
                  border-color: #c62828;
                }
              `}
              variant="outlined"
              onClick={handleClose}
            >
              やっぱりやめる
            </Button>
          </Stack>
        </Box>
      </Modal>
      <DeleteIcon
        onClick={handleClick}
        css={css`
          color: #e29090;
        `}
      />
    </Box>
  );
};
