import { useContext, useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { css } from "@emotion/react";
import { v4 as uuidv4 } from "uuid";
import { fetchUser, updateUser } from "../../api/user";
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

export const StoreMoney = ({ codes, setCodes }) => {
  // Task記録
  const { handleSubmit, control } = useForm();
  const [open, setOpen] = useState(false);
  const { user, setUser } = useContext(userContext);

  const onSubmit = (inputData) => {
    // ローカルストレージに保存
    const newCode = {
      id: uuidv4(),
      code: inputData.code,
      value: inputData.value,
    };
    const newCodes = JSON.parse(localStorage.getItem("codes")) || [];
    newCodes.push(newCode);
    localStorage.setItem("codes", JSON.stringify(newCodes));
    console.log(newCodes);
    setCodes(newCodes);

    // ユーザ保有EXPに反映する
    (async () => {
      const resCurrentUser = await fetchUser();
      if (resCurrentUser.status === 200) {
        const resUpdateUser = await updateUser({
          point: Number(resCurrentUser.data.point) + Number(inputData.value),
        });
        if (resUpdateUser.status === 200) {
          setUser(resUpdateUser.data);
          setCodes(updateUser.data);
        }
      }
    })();

    handleClose();
  };

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
          <Stack spacing={3}>
            <Typography variant="h6">入金</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                <Controller
                  name="code"
                  control={control}
                  rules={{ required: "コードを入力してください" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      inputProps={{ style: { backgroundColor: "#fff" } }}
                      {...field}
                      id="newReward"
                      label="ギフトコード"
                      variant="outlined"
                      fullWidth
                      name="code"
                      error={fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
                <Controller
                  name="value"
                  control={control}
                  defaultValue="100"
                  rules={{ required: "価格を入力してください" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      inputProps={{ style: { backgroundColor: "#fff" } }}
                      {...field}
                      id="newAssign"
                      label="金額"
                      variant="outlined"
                      fullWidth
                      name="value"
                      type="number"
                      error={fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
                <Button
                  css={css`
                    color: #fff;
                    background-color: #f67690;
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
                  入金する
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Modal>
      <Stack spacing={2}>
        <Button
          css={css`
            color: #ff0d72;
            border-color: #ff0d72;
            &:hover {
              color: #ff0d72;
              opacity: 0.8;
            }
          `}
          variant="outlined"
          onClick={handleClick}
          fullWidth
        >
          AMAZON
        </Button>
        <Button
          css={css`
            color: #ff0d72;
            border-color: #ff0d72;
            &:hover {
              color: #ff0d72;
              opacity: 0.8;
            }
          `}
          variant="outlined"
          onClick={handleClick}
          fullWidth
        >
          iTunes
        </Button>
        <Button
          css={css`
            color: #ff0d72;
            border-color: #ff0d72;
            &:hover {
              color: #ff0d72;
              opacity: 0.8;
            }
          `}
          variant="outlined"
          onClick={handleClick}
          fullWidth
        >
          Google Play
        </Button>
      </Stack>
    </Box>
  );
};
