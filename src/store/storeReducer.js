import { defaultPopularMovies, searchDefaultResults } from './const';

const types = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE',
  GET_POPULAR_MOVIES: 'GET_POPULAR_MOVIES',
  SEE_DETAIL_MOVIE: 'SEE_DETAIL_MOVIE',
  SET_SEARCH_RESULTS: 'SET_SEARCH_RESULTS',
  SET_DATA_USER: 'SET_DATA_USER',
};

const userDefault = {
  firstName: "Matias",
  lastName: "Cordoba",
  favoritesMovies: [
    { "id": "tt0848228", "resultType": "Title", "image": "https://imdb-api.com/images/original/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_Ratio0.7273_AL_.jpg", "title": "The Avengers", "description": "(2012)" },
  ],
  uid: 'xMZ7WkWFNGUgDSpNJOiWbSySPRs1',
};
const moviesDefault = [
    { "id": "tt0848228", "resultType": "Title", "image": "https://imdb-api.com/images/original/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_Ratio0.7273_AL_.jpg", "title": "The Avengers", "description": "(2012)" },
    { "id": "tt0118661", "resultType": "Title", "image": "https://imdb-api.com/images/original/MV5BYWE1NTdjOWQtYTQ2Ny00Nzc5LWExYzMtNmRlOThmOTE2N2I4XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_Ratio0.7273_AL_.jpg", "title": "The Avengers", "description": "(1998)" },
    { "id": "tt4154756", "resultType": "Title", "image": "https://imdb-api.com/images/original/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_Ratio0.7273_AL_.jpg", "title": "Avengers: Infinity War", "description": "(2018) aka \"The Avengers 3\"" },
    { "id": "tt2395427", "resultType": "Title", "image": "https://imdb-api.com/images/original/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_Ratio0.7273_AL_.jpg", "title": "Avengers: Age of Ultron", "description": "(2015) aka \"The Avengers: Age of Ultron\"" },
    { "id": "tt4154796", "resultType": "Title", "image": "https://imdb-api.com/images/original/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_Ratio0.7273_AL_.jpg", "title": "Avengers: Endgame", "description": "(2019)" },
    { "id": "tt0056174", "resultType": "Title", "image": "https://imdb-api.com/images/original/MV5BMjNmOTEzN2YtYTcyMC00NDQ1LTg5NTMtMjQ3M2ZlOGU2YmFkXkEyXkFqcGdeQXVyMzg1ODEwNQ@@._V1_Ratio0.7273_AL_.jpg", "title": "The Avenger", "description": "(1962)" }
  ];
const initialStore = {
  user: null,
  movies: [],
  popularMovies: [],
  searchResults: [],
  detailMovie: {},
  isLoggedIn: localStorage.getItem('isLoggedIn'),

};


const storeReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.LOGIN:
      return {
        ...state,
        user: { ...payload, favoritesMovies: [] },
        isLoggedIn: true,
      };
    case types.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: {},
      };
    case types.ADD_FAVORITE:
      return {
        ...state,
        user: {
          ...state.user,
          favoritesMovies: [...state.user.favoritesMovies, payload],
        }
      };
    case types.REMOVE_FAVORITE:
      return {
        ...state,
        user: {
          ...state.user,
          favoritesMovies: state.user.favoritesMovies.filter(movie => movie.id !== payload.id),
        }
      };
    case types.GET_POPULAR_MOVIES:
      return {
        ...state,
        popularMovies: payload,
      };
    case types.SEE_DETAIL_MOVIE:
      return {
        ...state,
        detailMovie: payload,
      };
    case types.SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: payload,
      };
    case types.SET_DATA_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload
        }
      }
    default:
      return state;
  };
};

export { initialStore, types };
export default storeReducer;

