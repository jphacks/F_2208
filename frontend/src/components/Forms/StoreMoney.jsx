import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  FormGroup,
  IconButton,
} from "@mui/material";

import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";


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

export const StoreMoney = ({handleReload}) => {
  // Task記録
  const { register, handleSubmit } = useForm();
  const [open, setOpen] = useState(false);

  // ローカルストレージに保存
  const onSubmit = (inputData) =>
    localStorage.setItem(
      inputData.code,
      inputData.value,
    );
    const handleClick = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
      handleReload();
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
          <Box sx={closeButtonStyle}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <div>入金</div>
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup onSubmit={handleSubmit(onSubmit)}>
              <br />
              <TextField
                id="newReward"
                label="ギフトコード"
                variant="outlined"
                fullWidth
                name="code"
                {...register("code")}
              />
              <br />
              <TextField
                id="newAssign"
                label="価格"
                variant="outlined"
                defaultValue="3000"
                fullWidth
                name="value"
                {...register("value")}
              />
              <br />
              <Button variant="contained" color="primary" type="submit">
               入金する
              </Button>
            </FormGroup>
          </form>
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleClick}>入金</Button>
    </Box>
  );
};