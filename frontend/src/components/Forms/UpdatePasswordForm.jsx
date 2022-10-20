import { useContext } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import { css } from "@emotion/react";
import { userContext } from "../../contexts/userContext";
import { useForm } from "react-hook-form";
import { updateUserPassword } from "../../api/user";

const UpdatePasswordForm = () => {
  const { handleSubmit, control, watch } = useForm();

  const handleClick = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  const onSubmit = async (inputData) => {
    console.log(inputData["new-password-confirmation"]);
    const res = await updateUserPassword({
      current_password: inputData["current-password"],
      password: inputData["new-password"],
      password_confirmation: inputData["new-password-confirmation"],
    });

    if (res.status === 200) {
      alert("パスワードを更新しました");
    } else {
      alert("パスワードを更新できませんでした");
    }
  };

  return (
    <Box
      css={css`
        padding-top: 30px;
      `}
    >
      <Typography
        variant="h6"
        element="h2"
        css={css`
          margin-bottom: 15px;
        `}
      >
        パスワードを再設定する
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Controller
            name="current-password"
            control={control}
            rules={{
              required: "現在のパスワードを入力してください",
              minLength: { value: 8, message: "8文字以上で入力してください" },
            }}
            render={({ field, fieldState }) => (
              <TextField
                inputProps={{ style: { backgroundColor: "#fff" } }}
                {...field}
                type="password"
                label="現在のパスワード"
                variant="outlined"
                error={fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="new-password"
            control={control}
            rules={{
              required: "新しいパスワードを入力してください",
              minLength: { value: 8, message: "8文字以上で入力してください" },
              validate: (val) => {
                if (watch("current-password") == val) {
                  return "現在と異なるパスワードを入力してください";
                }
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                inputProps={{ style: { backgroundColor: "#fff" } }}
                {...field}
                type="password"
                label="新しいパスワード"
                variant="outlined"
                error={fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="new-password-confirmation"
            control={control}
            rules={{
              required: "新しいパスワードを再入力してください",
              minLength: { value: 8, message: "8文字以上で入力してください" },
              validate: (val) => {
                if (watch("new-password") != val) {
                  return "パスワードが一致しません";
                }
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                inputProps={{ style: { backgroundColor: "#fff" } }}
                {...field}
                type="password"
                label="新しいパスワードの再入力"
                variant="outlined"
                error={fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <div>
            <Button
              css={css`
                width: 40%;
                margin: 10px auto 20px auto;
                padding-top: 10px;
                padding-bottom: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
              `}
              variant="contained"
              type="submit"
            >
              更新する
            </Button>
          </div>
        </Stack>
      </form>
    </Box>
  );
};

export default UpdatePasswordForm;
