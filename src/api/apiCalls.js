import axios from './axiosConfig';
const API_KEY = process.env.REACT_APP_API_KEY;

const getMovies = (search) => {
  return axios.get(`/SearchMovie/${API_KEY}/${search}&language=en`);
}

const getDetailsMovie = (id) => {
  return axios.get(`/Title/${API_KEY}/${id}&language=en`);
}

const getMoviesPopular = () => {
  return axios.get(`/movie/popular?${API_KEY}&language=en`);
}

const getResultSearch = querySearch  => {
  return axios.get(`/search/movie?${API_KEY}&query=${querySearch}&language=en`)
}

const getMoreDetail = movieId => {
  return axios.get(`/movie/${movieId}?${API_KEY}&language=en`)
}
const getTopRated = () => {
  return axios.get(`/movie/top_rated?${API_KEY}&language=en`);
}
export { getMovies, getDetailsMovie, getMoviesPopular, getResultSearch, getMoreDetail, getTopRated };
