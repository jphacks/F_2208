import { Alert, FormGroup, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import { css } from "@emotion/react";

export const RegisterForm = ({
  register,
  onSubmit,
  handleSubmit,
  control,
  watch,
}) => {
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1
          css={css`
            text-align: center;
          `}
        >
          新規登録
        </h1>
        <Stack spacing={2}>
          <Controller
            name="name"
            control={control}
            rules={{ required: "ニックネームを入力してください" }}
            render={({ field, fieldState }) => (
              <TextField
                inputProps={{ style: { backgroundColor: "#fff" } }}
                {...field}
                type="text"
                label="ニックネーム"
                variant="outlined"
                error={fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              required: "メールアドレスを入力してください",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "メールアドレスの形式が正しくありません",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                inputProps={{ style: { backgroundColor: "#fff" } }}
                {...field}
                type="text"
                label="メールアドレス"
                variant="outlined"
                error={fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: "パスワードを入力してください",
              minLength: { value: 8, message: "8文字以上で入力してください" },
              validate: (val) => {
                if (watch("password") != val) {
                  return "パスワードが違います";
                }
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                inputProps={{ style: { backgroundColor: "#fff" } }}
                {...field}
                type="password"
                label="パスワード"
                variant="outlined"
                error={fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="password_confirmation"
            control={control}
            rules={{
              required: "パスワードを再入力してください",
              minLength: { value: 8, message: "8文字以上で入力してください" },
              validate: (val) => {
                if (watch("password") != val) {
                  return "パスワードが一致しません";
                }
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                inputProps={{ style: { backgroundColor: "#fff" } }}
                {...field}
                type="password"
                label="パスワードの再入力"
                variant="outlined"
                error={fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Stack>
        <div>
          <Button
            css={css`
              width: 40%;
              margin: 50px auto 0px auto;
              padding-top: 10px;
              padding-bottom: 10px;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: #ff0d72;
              opacity: 0.8;
              border-color: #ff0d72;
              &:hover {
                color: #fff;
                background-color: #dc8ba7;
                opacity: 0.8;
                border-color: #ff0d72;
              }
            `}
            variant="contained"
            type="submit"
          >
            新規登録
          </Button>
        </div>
      </form>
    </Box>
  );
};
