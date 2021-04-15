import { Card, Divider } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { getTopRated } from '../api/apiCalls';
import { StoreContext } from '../store/StoreProvider';
import ListMoviesContainer from './containers/ListMoviesContainer';

function TopRatedMovies() {

  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getTopRated()
      .then(({ data }) => {
        setMovies(data.results)
      })
  }, [])
  return (
    <Card>
      <Divider orientation="left" >Top rated</Divider>
      <ListMoviesContainer movies={movies} stringKey="TopRatedMovies" />
    </Card>
  );
};

export default TopRatedMovies;
