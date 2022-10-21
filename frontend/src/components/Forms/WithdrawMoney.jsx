import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  IconButton,
  Typography,
  Stack,
  Select,
  MenuItem,
  Alert,
  Card,
  CardContent,
  Grid,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { css } from "@emotion/react";
import { userContext } from "../../contexts/userContext";
import { fetchUser, updateUser } from "../../api/user";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";

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

export const WithdrawMoney = ({ codes, setCodes }) => {
  const { handleSubmit, control } = useForm();
  const [open, setOpen] = useState(false);
  const [withdrawableCodes, setWithdrawableCodes] = useState([]);
  const { user, setUser } = useContext(userContext);
  const [withdrawnCode, setWithdrawnCode] = useState({});
  console.log("withdrawnCode");
  console.log(withdrawnCode);

  useEffect(() => {
    if (codes) {
      setWithdrawableCodes(
        codes.filter(
          (code) => user.balance_exp > 0 && user.balance_exp >= code.value
        )
      );
    }
  }, [codes]);

  const onSubmit = (inputData) => {
    // ギフトコードを取り出す
    const code = getGiftCode(inputData.id);
    const currentCodes = JSON.parse(localStorage.getItem("codes"));
    const newCodes = currentCodes.filter((code) => code.id !== inputData.id);
    localStorage.setItem("codes", JSON.stringify(newCodes));
    setCodes(newCodes);

    // ユーザ保有EXPに反映する
    (async () => {
      const resCurrentUser = await fetchUser();
      if (resCurrentUser.status === 200) {
        const resUpdateUser = await updateUser({
          balance_exp:
            Number(resCurrentUser.data.balance_exp) - Number(code.value),
          point: Number(resCurrentUser.data.point) - Number(code.value),
        });
        if (resUpdateUser.status === 200) {
          setUser(resUpdateUser.data);
        }
      }
    })();

    // ギフトコードを表示する
    setWithdrawnCode(code);
  };

  const getGiftCode = (id) => {
    const code = withdrawableCodes.filter((code) => code.id === id);
    return code[0];
  };

  //モーダルの操作
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
            <Typography variant="h6">出金</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                <Controller
                  name="id"
                  control={control}
                  rules={{ required: "金額を選択してください" }}
                  render={({ field, fieldState }) => (
                    <>
                      {!!withdrawableCodes.length ? (
                        <Select {...field}>
                          {withdrawableCodes.map((code) => (
                            <MenuItem value={code.id}>{code.value} 円</MenuItem>
                          ))}
                        </Select>
                      ) : (
                        <Alert severity="warning">
                          出金するものがありません。
                          <br />
                          ギフトコードで入金するか、タスクを完了してEXPを貯めてください。
                        </Alert>
                      )}
                    </>
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
                  type="submit"
                  disabled={!withdrawableCodes.length}
                >
                  出金する
                </Button>
                {!!Object.keys(withdrawnCode).length && (
                  <Box>
                    <Card sx={{ boxShadow: 3 }}>
                      <Grid container alignItems="center">
                        <Grid item xs={12}>
                          <CardContent>
                            <Stack spacing={1.5}>
                              {" "}
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                              >
                                <CardGiftcardIcon />
                                <Typography variant="p" element="p">
                                  ギフトコード
                                </Typography>
                              </Stack>
                              <Box
                                css={css`
                                  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px
                                    0px inset;
                                  padding: 0.5em;
                                  background-color: #fafafa;
                                `}
                              >
                                <Typography variant="h6" element="p">
                                  {withdrawnCode.code}
                                </Typography>
                              </Box>
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={0.5}
                              >
                                <CurrencyYenIcon fontSize="small" />
                                <Typography variant="p" element="p">
                                  {withdrawnCode.value}円
                                </Typography>
                              </Stack>
                            </Stack>
                          </CardContent>
                        </Grid>
                      </Grid>
                    </Card>
                  </Box>
                )}
              </Stack>
            </form>
          </Stack>
        </Box>
      </Modal>
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
        onClick={handleClick}
      >
        出金
      </Button>
    </Box>
  );
};
