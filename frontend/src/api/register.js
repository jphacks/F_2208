import axios from "../libs/axios";

const register = (name, email, password, password_confirmation) => {
  axios.get("/sanctum/csrf-cookie").then(() => {
    axios
      .post("/api/register", {
        name,
        email,
        password,
        password_confirmation,
      })
      .then((data) => {
        console.log(data);
      });
  });
};

export default register;
