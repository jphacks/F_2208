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

export const updateUser = async (name, email, avatar, level, total_exp, balance_exp) => {
  return await axios
    .put("/api/user", {
      name,
      email,
      avatar,
      level,
      total_exp,
      balance_exp,
    })
    .then((res) => {
      console.log("[user]更新成功")
      return res;
    })
    .catch((error) => {
      console.log("[user]更新失敗")
      console.log(error);
      return error;
    })
}

export const deleteUser = async () => {
  return await axios
    .delete("/api/user")
    .then((res) => {
      console.log("[user]削除成功")
      return res;
    })
    .catch((error) => {
      console.log("[user]削除失敗")
      console.log(error);
      return error;
    })
}
