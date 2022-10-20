import { useContext, useState } from "react";
import { RegisterForm } from "../components/Forms/RegisterForm";
import { LoginForm } from "../components/Forms/LoginForm";
import { useForm } from "react-hook-form";
import register from "../api/register";
import login from "../api/login";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import { css } from "@emotion/react";
import PigImage from "../assets/img/pig.png";
import { userContext } from "../contexts/userContext";
import { fetchUser } from "../api/user";

const Top = () => {
  const user = useContext(userContext);
  // ログインor新規登録表示切り替え用
  const [showRegisterForm, setShowRegisterForm] = useState(0);
  const {
    register: registerLoginForm,
    handleSubmit: handleSubmitLoginForm,
    control: controlLoginForm,
    watch: watchLoginForm,
  } = useForm();
  const {
    register: registerRegisterForm,
    handleSubmit: handleSubmitRegisterForm,
    control: controlRegisterForm,
    watch: watchRegisterForm,
  } = useForm();
  const navigate = useNavigate();

  const handleClick = () => {
    setShowRegisterForm(!showRegisterForm);
  };
  // react-hook-formのイベント
  const onSubmitRegisterForm = async (inputData) => {
    const res = await register(
      inputData.name,
      inputData.email,
      inputData.password,
      inputData.password_confirmation
    );

    if (res.status === 201) {
      const res = await fetchUser();
      user.setUser(res.data);
      navigate("/dashboard");
    }
  };
  const onSubmitLoginForm = async (inputData) => {
    const res = await login(inputData.email, inputData.password);

    if (res.status === 200) {
      const res = await fetchUser();
      user.setUser(res.data);
      navigate("/dashboard");
    }
  };

  return (
    <div
      css={css`
        background-image: url(${PigImage});
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        background-color: rgba(255, 255, 255, 0.6);
        background-blend-mode: lighten;
        background-size: 180%;
        @media screen and (min-width: 768px) {
          background-size: 100%;
        }
        @media screen and (min-width: 1024px) {
          max-width: 1600px;
        }
        position: center;
        width: 100%;
        height: calc(100vh - 80px);
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <Container maxWidth="sm">
        {showRegisterForm ? (
          <RegisterForm
            register={registerRegisterForm}
            onSubmit={onSubmitRegisterForm}
            handleSubmit={handleSubmitRegisterForm}
            control={controlRegisterForm}
            watch={watchRegisterForm}
          />
        ) : (
          <LoginForm
            register={registerLoginForm}
            onSubmit={onSubmitLoginForm}
            handleSubmit={handleSubmitLoginForm}
            control={controlLoginForm}
            watch={watchLoginForm}
          />
        )}
        <p
          css={css`
            width: 33%;
            margin: 0 auto;
            padding-top: 15px;
            padding-bottom: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          または
        </p>
        <Button
          css={css`
            width: 40%;
            margin: 0 auto;
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 10px;
            padding-bottom: 10px;
          `}
          color="inherit"
          variant="outlined"
          onClick={handleClick}
        >
          {!showRegisterForm ? "新規登録" : "ログイン"}
        </Button>
      </Container>
    </div>
  );
};

export default Top;
