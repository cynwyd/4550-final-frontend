import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const searchMovie = (title) => {
  return axios.get(API_URL + "movie/search/s?q=" + title);
};

export default {
  searchMovie
};