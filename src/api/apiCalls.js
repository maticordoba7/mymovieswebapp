import axios from './axiosConfig';
const API_KEY = process.env.REACT_APP_API_KEY;

const getMovies = (search) => {
  return axios.get(`/SearchMovie/${API_KEY}/${search}&language=es`);
}

const getDetailsMovie = (id) => {
  return axios.get(`/Title/${API_KEY}/${id}&language=es`);
}

const getMoviesPopular = () => {
  return axios.get(`/movie/popular?${API_KEY}&language=es`);
}

const getResultSearch = querySearch  => {
  return axios.get(`/search/movie?${API_KEY}&query=${querySearch}&language=es`)
}

const getMoreDetail = movieId => {
  return axios.get(`/movie/${movieId}?${API_KEY}&language=es`)
}
const getTopRated = () => {
  return axios.get(`/movie/top_rated?${API_KEY}&language=es`);
}
export { getMovies, getDetailsMovie, getMoviesPopular, getResultSearch, getMoreDetail, getTopRated };
