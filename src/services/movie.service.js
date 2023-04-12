import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const searchMovie = (title) => {
  return axios.get(API_URL + "movie/search/s?q=" + title);
};

const getMovieByID = (id) => {
  return axios.get(API_URL + "movie/get/id?q=" + id);
};

export default {
  searchMovie,
  getMovieByID
};