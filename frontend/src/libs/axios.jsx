import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://jphacks2022.miravy.com",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

export default axios;
