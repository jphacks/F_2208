import axios from "../libs/axios";

export const fetchFriends = async () => {
  return await axios
    .get("/api/friends")
    .then((res) => {
      // console.log("[friends]取得成功");
      return res;
    })
    .catch((error) => {
      // console.log("[friends]取得失敗");
      // console.log(error);
      return error;
    });
}

export const fetchFriend = async ({ friend_id }) => {
  return await axios
    .get(`/api/friends/${friend_id}`)
    .then((res) => {
      // console.log("[friend]取得成功");
      return res;
    })
    .catch((error) => {
      // console.log("[friend]取得失敗");
      // console.log(error);
      return error;
    });
}

export const createFriend = async ({ friend_id, intimacy, favorite, sent_exp, received_exp }) => {
  return await axios
    .post(`/api/friends`, {
      friend_id,
      intimacy,
      favorite,
      sent_exp,
      received_exp,
    })
    .then((res) => {
      // console.log("[friend]作成成功");
      return res;
    })
    .catch((error) => {
      // console.log("[friend]作成失敗");
      // console.log(error);
      return error;
    });
}

export const updateFriend = async ({ friend_id, intimacy, favorite, sent_exp, received_exp }) => {
  return await axios
    .put(`/api/friends/${friend_id}`, {
      intimacy,
      favorite,
      sent_exp,
      received_exp,
    })
    .then((res) => {
      // console.log("[friend]更新成功");
      return res;
    })
    .catch((error) => {
      // console.log("[friend]更新失敗");
      // console.log(error);
      return error;
    });
}

export const deleteFriend = async ({ friend_id }) => {
  return await axios
    .delete(`/api/friends/${friend_id}`)
    .then((res) => {
      // console.log("[friend]削除成功")
      return res;
    })
    .catch((error) => {
      // console.log("[friend]削除失敗")
      // console.log(error);
      return error;
    })
}

export const searchFriend = async ({ email }) => {
  return await axios
    .get(`/api/friends/search?email=${email}`)
    .then((res) => {
      // console.log("[friend]取得成功");
      return res;
    })
    .catch((error) => {
      // console.log("[friend]取得失敗");
      // console.log(error);
      return error;
    });
}
export const fetchFriendUsers = async () => {
  return await axios
    .get(`/api/friend/users`)
    .then((res) => {
      // console.log("[friend]取得成功");
      return res;
    })
    .catch((error) => {
      // console.log("[friend]取得失敗");
      // console.log(error);
      return error;
    });
}
