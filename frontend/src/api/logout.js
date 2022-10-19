import axios from "../libs/axios";

const logout = async () => {
  return await axios
    .post("/api/logout")
    .then((res) => {
      console.log("ログアウト成功");
      console.log(res);
      window.location.href = "/";
      return res;
    })
    .catch((err) => {
      console.log("ログアウト失敗");
      console.log(err.response);
    });
};

export default logout;
