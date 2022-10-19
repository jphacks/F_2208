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

export const fetchFriend = async (user_id) => {
  return await axios
    .get(`/api/friends/${user_id}`)
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

export const createFriend = async (user_id, intimacy, favorite, sent_exp, received_exp) => {
  return await axios
    .post(`/api/friends`, {
      user_id,
      intimacy,
      favorite,
      sent_exp,
      received_exp,
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

export const updateFriend = async (intimacy, favorite, sent_exp, received_exp) => {
  return await axios
    .put(`/api/friends/${user_id}`, {
      intimacy,
      favorite,
      sent_exp,
      received_exp,
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

export const deleteFriend = async (user_id) => {
  return await axios
    .delete(`/api/friends/${user_id}`)
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
