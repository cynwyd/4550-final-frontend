import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

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