import axios from "../libs/axios";

export const fetchTasks = async () => {
  return await axios
    .get("/api/tasks")
    .then((res) => {
      // console.log("[tasks]取得成功");
      return res;
    })
    .catch((error) => {
      // console.log("[tasks]取得失敗");
      // console.log(error);
      return error;
    });
}

export const fetchTask = async ({ id }) => {
  return await axios
    .get(`/api/tasks/${id}`)
    .then((res) => {
      // console.log("[task]取得成功");
      return res;
    })
    .catch((error) => {
      // console.log("[task]取得失敗");
      // console.log(error);
      return error;
    });
}

export const createTask = async ({ title, description, exp, time_limit, severity, status, user_id }) => {
  return await axios
    .post(`/api/tasks`, {
      title,
      description,
      exp,
      time_limit,
      severity,
      status,
      user_id,
    })
    .then((res) => {
      // console.log("[task]作成成功");
      return res;
    })
    .catch((error) => {
      // console.log("[task]作成失敗");
      // console.log(error);
      return error;
    });
}

export const updateTask = async ({ id, title, description, exp, time_limit, severity, status, user_id }) => {
  return await axios
    .put(`/api/tasks/${id}`, {
      title,
      description,
      exp,
      time_limit,
      severity,
      status,
      user_id,
    })
    .then((res) => {
      // console.log("[task]更新成功");
      return res;
    })
    .catch((error) => {
      // console.log("[task]更新失敗");
      // console.log(error);
      return error;
    });
}

export const deleteTask = async ({ id }) => {
  return await axios
    .delete(`/api/tasks/${id}`)
    .then((res) => {
      // console.log("[task]削除成功")
      return res;
    })
    .catch((error) => {
      // console.log("[task]削除失敗")
      // console.log(error);
      return error;
    })
}

export const updateDoTask = async ({ id }) => {
  return await axios
    .put(`/api/tasks/${id}/do`)
    .then((res) => {
      // console.log("[task]更新成功");
      return res;
    })
    .catch((error) => {
      // console.log("[task]更新失敗");
      // console.log(error);
      return error;
    });
}

export const updateUndoTask = async ({ id }) => {
  return await axios
    .put(`/api/tasks/${id}/undo`)
    .then((res) => {
      // console.log("[task]更新成功");
      return res;
    })
    .catch((error) => {
      // console.log("[task]更新失敗");
      // console.log(error);
      return error;
    });
}

export const fetchOrderedTasks = async () => {
  return await axios
    .get("/api/task/ordered")
    .then((res) => {
      // console.log("[tasks]取得成功");
      return res;
    })
    .catch((error) => {
      // console.log("[tasks]取得失敗");
      // console.log(error);
      return error;
    });
}
