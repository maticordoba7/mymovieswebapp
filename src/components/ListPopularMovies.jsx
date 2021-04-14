import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../store/StoreProvider';
import ListMoviesContainer from './containers/ListMoviesContainer';
import { getMoviesPopular } from '../api/apiCalls';
import { types } from '../store/storeReducer';
import { Card, Divider } from 'antd';

function ListPopularMovies(props) {
  const [store, dispatch] = useContext(StoreContext);
  const { popularMovies } = store;
  useEffect(() => {
    getMoviesPopular()
      .then(({ data }) => {
        console.log(data)
        dispatch({
          type: types.GET_POPULAR_MOVIES,
          payload: data.results,
        });
      })
  }, [])

  return (
    <Card >
      <Divider orientation="left">Popular Movies</Divider>
      <ListMoviesContainer movies={popularMovies} />
    </Card>
  );
};

export default ListPopularMovies;
