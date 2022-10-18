import { useState } from "react";
import { RegisterForm } from "../components/RegisterForm";
import { LoginForm } from "../components/LoginForm";
import { useForm } from "react-hook-form";
import register from "../api/register";
import login from "../api/login";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";

const Top = () => {
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
  const onSubmitRegisterForm = (inputData) => {
    register(
      inputData.name,
      inputData.email,
      inputData.password,
      inputData.password_confirmation
    );
    navigate("dashboard");
  };
  const onSubmitLoginForm = (inputData) => {
    login(inputData.email, inputData.password);
    navigate("dashboard");
  };

  return (
    <Container maxWidth="sm">
      <div>
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
        )}
        <div>または</div>
        <Button color="inherit" variant="outlined" onClick={handleClick}>
          {!showRegisterForm ? "新規登録" : "ログイン"}
        </Button>
      </div>
    </Container>
  );
};

export default Top;
