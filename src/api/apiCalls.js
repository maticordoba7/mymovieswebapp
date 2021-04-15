import axios from './axiosConfig';
const API_KEY = process.env.REACT_APP_API_KEY;
console.log({ lenguage: window.navigator.language });
const language = 'en';

const getMovies = (search) => {
  return axios.get(`/SearchMovie/${API_KEY}/${search}&language=${language}`);
};

const getDetailsMovie = (id) => {
  return axios.get(`/Title/${API_KEY}/${id}&language=${language}`);
};

const getMoviesPopular = () => {
  return axios.get(`/movie/popular?${API_KEY}&language=${language}`);
};

const getResultSearch = querySearch => {
  return axios.get(`/search/movie?${API_KEY}&query=${querySearch}&language=${language}`)
};

const getMoreDetail = movieId => {
  return axios.get(`/movie/${movieId}?${API_KEY}&language=${language}`);
};

const getTopRated = () => {
  return axios.get(`/movie/top_rated?${API_KEY}&language=${language}`);
};

const getUpcomingMovies = () => {
  return axios.get(`/movie/upcoming?${API_KEY}&language=${language}`);
}

const getNowPlayingMovies = () => {
  return axios.get(`/movie/now_playing?${API_KEY}&language=${language}`);
}

export { getMovies, getDetailsMovie, getMoviesPopular, getResultSearch, getMoreDetail, getTopRated, getUpcomingMovies, getNowPlayingMovies };
