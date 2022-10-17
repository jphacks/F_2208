import { useState } from "react";
import { RegisterForm } from "../components/RegisterForm";
import { LoginForm } from "../components/LoginForm";
import { useForm } from "react-hook-form";
import register from "../api/register";
import login from "../api/login";

import axios from "../libs/axios";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';



const Top = () => {
  // ログインor新規登録表示切り替え用
  const [showRegisterForm, setShowRegisterForm] = useState(0);
  const { register : registerLoginForm, handleSubmit : handleSubmitLoginForm } = useForm();
  const { register : registerRegisterForm, handleSubmit : handleSubmitRegisterForm } = useForm();

  const handleClick = () => {
    setShowRegisterForm(! showRegisterForm);
  }
  // react-hook-formのイベント
  const onSubmitRegisterForm = (inputData) => {
    register(inputData.name, inputData.email, inputData.password, inputData.password_confirmation)
  }
  const onSubmitLoginForm = (inputData) => {
    login(inputData.email, inputData.password);
  }

  return (
    <Box>
      <div>
        {showRegisterForm ? <RegisterForm register={registerRegisterForm} onSubmit={onSubmitRegisterForm} handleSubmit={handleSubmitRegisterForm} /> : <LoginForm register={registerLoginForm} onSubmit={onSubmitLoginForm} handleSubmit={handleSubmitLoginForm}/>}
        <div>または</div>
        <Button color="inherit" variant="outlined" onClick={handleClick} >{! showRegisterForm ? "新規登録" : "ログイン" }</Button>
      </div>
    </Box>
  );
};

export default Top;
