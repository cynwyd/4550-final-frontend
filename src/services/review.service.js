import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const createReview = (review) => {
  return axios.post(API_URL + "review/new", review);
};

export default {
  createReview
};