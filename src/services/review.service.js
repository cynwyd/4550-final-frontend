import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const createReview = (review) => {
  return axios.post(API_URL + "review/new", review);
};

const getReview = (reviewID) => {
  return axios.get(API_URL + "review/" + reviewID);
};

const getReviewsByMovieID = (imdbID) => {
  return axios.get(API_URL + "review/movie/" + imdbID);
};

const likeReview = (reviewID, userID) => {
  return axios.put(API_URL + "review/" + reviewID + "/like", {userID: userID});
};

export default {
  createReview,
  getReview,
  getReviewsByMovieID,
  likeReview
};