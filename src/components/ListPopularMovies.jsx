import React, { useEffect, useState } from 'react';
import ListMoviesContainer from './containers/ListMoviesContainer';
import { getMoviesPopular } from '../api/apiCalls';
import { Card, Divider } from 'antd';

function ListPopularMovies() {
  const [popularMovies, setPopularMovies] = useState([])
  useEffect(() => {
    getMoviesPopular()
      .then(({ data }) => {
        console.log(data)
        setPopularMovies(data.results)
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
