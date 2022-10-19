import axios from "../libs/axios";

export const fetchFriends = async () => {
  return await axios
    .get("/api/friends")
    .then((res) => {
      console.log("[friends]取得成功");
      return res;
    })
    .catch((error) => {
      console.log("[friends]取得失敗");
      console.log(error);
      return error;
    });
}

export const fetchFriend = async (id) => {
  return await axios
    .get(`/api/friends/${id}`)
    .then((res) => {
      console.log("[friend]取得成功");
      return res;
    })
    .catch((error) => {
      console.log("[friend]取得失敗");
      console.log(error);
      return error;
    });
}

export const createFriend = async (title, description, exp, time_limit, severity, status, user_id, order_user_id) => {
  return await axios
    .post(`/api/friends`, {
      title,
      description,
      exp,
      time_limit,
      severity,
      status,
      user_id,
      order_user_id
    })
    .then((res) => {
      console.log("[friend]作成成功");
      return res;
    })
    .catch((error) => {
      console.log("[friend]作成失敗");
      console.log(error);
      return error;
    });
}

export const updateFriend = async (id, title, description, exp, time_limit, severity, status, user_id, order_user_id) => {
  return await axios
    .put(`/api/friends/${id}`, {
      title,
      description,
      exp,
      time_limit,
      severity,
      status,
      user_id,
      order_user_id
    })
    .then((res) => {
      console.log("[friend]更新成功");
      return res;
    })
    .catch((error) => {
      console.log("[friend]更新失敗");
      console.log(error);
      return error;
    });
}

export const deleteFriend = async (id) => {
  return await axios
    .delete(`/api/friends/${id}`)
    .then((res) => {
      console.log("[friend]削除成功")
      return res;
    })
    .catch((error) => {
      console.log("[friend]削除失敗")
      console.log(error);
      return error;
    })
}
