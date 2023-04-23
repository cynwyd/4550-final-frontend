import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const getPublicContent = () => {
  return axios.get(API_URL + "review/recent");
};

const getUserContent = (id) => {
  return axios.get(API_URL + "review/recent/" + id);
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const updateUserInfo = (updatedInfo, userID) => {
  return axios.put(API_URL + "user/" + userID + "/update", updatedInfo, { headers: authHeader() });
}

const getUserInfo = (userID) => {
  return axios.get(API_URL + "user/" + userID);
}

const followUser = (userID) => {
  return axios.post(API_URL + "user/" + userID + "/follow", {}, { headers: authHeader() });
}

export default {
  getPublicContent,
  getUserContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  updateUserInfo,
  getUserInfo,
  followUser
};