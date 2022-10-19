import { useContext } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import { css } from "@emotion/react";
import { userContext } from "../contexts/userContext";
import { useForm } from "react-hook-form";
import { fetchUser, updateUser } from "../api/user";

const SettingForm = () => {
  const { user, setUser } = useContext(userContext);
  const { handleSubmit, control } = useForm();

  const onSubmit = async (inputData) => {
    const res = await updateUser(inputData.name, inputData.email);
    console.log(res);

    if (res.status === 200) {
      const res = await fetchUser();
      setUser(res.data);
      alert("ユーザー情報を更新しました");
    } else {
      alert("ユーザ情報を更新できませんでした");
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
        ユーザー情報
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Controller
            name="name"
            control={control}
            rules={{ required: "ニックネームを入力してください" }}
            defaultValue={user.name}
            render={({ field, fieldState }) => (
              <TextField
                css={css`
                  background-color: white;
                `}
                {...field}
                type="text"
                label="ニックーネーム"
                variant="outlined"
                error={fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue={user.email}
            rules={{
              required: "メールアドレスを入力してください",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "メールアドレスの形式が正しくありません",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                css={css`
                  background-color: white;
                `}
                {...field}
                type="text"
                label="メールアドレス"
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
                margin: 10px auto 20px;
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

export default SettingForm;