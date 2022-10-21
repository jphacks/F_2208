import axios from "../libs/axios";

const register = async (name, email, password, password_confirmation) => {
  return await axios.get("/sanctum/csrf-cookie").then(async () => {
    return await axios
      .post("/api/register", {
        name,
        email,
        password,
        password_confirmation,
      })
      .then((res) => {
        // console.log(res);
        return res;
      }).catch((error) => {
        // console.log(error);
        return error;
      })
  });
};

export default register;
