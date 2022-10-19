import axios from "../libs/axios";

const login = async (email, password) => {
  return await axios.get("/sanctum/csrf-cookie").then(async () => {
    return await axios
      .post("/api/login", {
        email,
        password,
      })
      .then((res) => {
        console.log("ログイン成功");
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log("ログイン失敗");
        console.log(err.response);
      });
  });
};

export default login;
