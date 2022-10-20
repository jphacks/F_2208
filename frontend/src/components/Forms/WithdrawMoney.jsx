import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
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

export const WithdrawMoney = ({ handleReload, reload }) => {

  const { handleSubmit, control } = useForm();
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState();
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    fetchCodes();
  }, [reload]);

  //取り出すギフトコード番号
  const onSubmit = (inputData) =>
    fetchCode(
      inputData.codesNum
    );
  //モーダルの操作
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    handleReload();
  };
  //コードを表示するためのフェッチ
  const fetchCodes = () => {
    var newCodes = [];
    for (var i = 0, length = localStorage.length; i < length; ++i) {
      newCodes.push(localStorage.getItem(localStorage.key(i)));
    }
    setCodes(newCodes);
  }
  // コードの取り出し処理
  const fetchCode = (num) => {
    setCode(localStorage.key(num - 1));
    localStorage.removeItem(localStorage.key(num - 1));
  }

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
          <div>出金</div>
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <br />
            <Controller
              name="codeNum"
              control={control}
              rules={{ required: "番号を入力してください" }}
              render={({ field, fieldState }) => (
                <TextField
                  inputProps={{ style: { backgroundColor: "#fff" } }}
                  {...field}
                  id="newReward"
                  label="ギフトコード番号"
                  variant="outlined"
                  fullWidth
                  defaultValue="1"
                  name="codesNum"
                  type="number"
                  error={fieldState.error}
                  helperText={fieldState.error?.message}
                />)}
            />
            <br />
            <Button variant="contained" color="primary" type="submit" >
              出金する
            </Button>
          </form>
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleClick}>出金</Button>
      {!!code ? <Typography variant="h1" component="h2" align="center">
        最後に取り出したコード{code}
      </Typography> : ""}
      <ol>
        {codes.map((code, index) => (
          <li >{code}</li>
        ))}
      </ol>
    </Box>
  );
};