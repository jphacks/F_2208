import axios from "../libs/axios";

export const fetchUser = async () => {
  return await axios
    .get("/api/user")
    .then((res) => {
      console.log("[user]ログイン済");
      return res;
    })
    .catch((error) => {
      console.log("[user]ログインしていません");
      console.log(error);
      return error;
    });
}
