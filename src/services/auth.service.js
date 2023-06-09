import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "auth/";

const register = (username, email, password, reviewer) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    reviewer
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};