import { useContext } from "react";
import { Alert, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { css } from "@emotion/react";
import { userContext } from "../../contexts/userContext";
import { useForm } from "react-hook-form";
import { deleteUser } from "../../api/user";
import { useNavigate } from "react-router-dom";

const DeleteForm = () => {
  const { setUser } = useContext(userContext);
  const { handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (inputData) => {
    if (confirm("本当に削除してもよろしいですか？")) {
      const res = await deleteUser(
        inputData.name,
        inputData.email,
        inputData.password,
        inputData.password_confirmation
      );

      if (res.status === 200) {
        setUser(undefined);
        navigate("/");
      } else {
        alert("削除できませんでした");
      }
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h6" element="h2">
        ユーザを削除する
      </Typography>
      <Alert severity="warning">同じメールアドレスで再登録はできません。</Alert>

      <div>
        <Button
          color="error"
          css={css`
            width: 40%;
            padding-top: 10px;
            padding-bottom: 10px;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
          variant="contained"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          削除する
        </Button>
      </div>
    </Stack>
  );
};

export default DeleteForm;
