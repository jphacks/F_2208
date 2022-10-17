import { Button } from "@mui/material";
import login from "../api/login";
import register from "../api/register";
import axios from "../libs/axios";

const Top = () => {
  const name = "email";
  const email = "test@exapmle.com";
  const password = "sdafaw3970rpaiwou";

  const handleSubmitRegister = () => {
    axios.get("/api/user").then((res) => console.log(res));
  };
  return (
    <>
      <Button onClick={handleSubmitRegister}>ユーザ</Button>
      <Button onClick={() => register(name, email, password, password)}>
        登録
      </Button>
      <Button onClick={() => login(email, password)}>ログイン</Button>
    </>
  );
};

export default Top;
