import { defaultPopularMovies, searchDefaultResults, userDefault, moviesDefault } from './const';

const types = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  SET_DATA_USER: 'SET_DATA_USER',
};


const initialStore = {
  user: null,
  isLoggedIn: localStorage.getItem('isLoggedIn'),
};

const storeReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.LOGIN:
      return {
        ...state,
        user: { ...payload },
        isLoggedIn: true,
      };
    case types.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: {},
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

