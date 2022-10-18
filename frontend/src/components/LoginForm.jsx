import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

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
        <h1>ログイン</h1>
        <Stack spacing={3}>
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
        <Button variant="contained" type="submit">
          ログイン
        </Button>
      </form>
    </Box>
  );
};
