import axios from "../libs/axios";

const auth = (navigate) => {
  axios
    .get("/api/user")
    .then(() => {
      console.log("ログイン済");
    })
    .catch((error) => {
      console.log("ログインしていません");
      console.log(error);
      navigate("/");
    });
};

export default auth;
