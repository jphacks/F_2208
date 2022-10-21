import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import { css } from "@emotion/react";

export const LoginForm = ({
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
          ログイン
        </h1>
        <Stack spacing={5}>
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
                sx={"background-color:transparent;outline:red;"}
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
        </Stack>
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
            opacity:0.8;
                  border-color: #ff0d72;
                  &:hover {
                    color:color: #ff0d72;;
                    background-color: #dc8ba7;
                    opacity:0.8;
                    border-color: #ff0d72;
                  }
          `}
          variant="contained"
          type="submit"
        >
          ログイン
        </Button>
      </form>
    </Box>
  );
};
