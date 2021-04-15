import React, { useEffect, useState } from 'react';
import ListMoviesContainer from './containers/ListMoviesContainer';
import { getUpcomingMovies } from '../api/apiCalls';
import { Card, Divider } from 'antd';

function UpcomingMovies() {
  const [upcomingMovies, setUpcomingMovies] = useState([])
  useEffect(() => {
    getUpcomingMovies()
      .then(({ data }) => {
        console.log(data)
        setUpcomingMovies(data.results)
      })
  }, [])

  return (
    <Card >
      <Divider orientation="left">Upcoming movies</Divider>
      <ListMoviesContainer movies={upcomingMovies} stringKey="UpcomingMovies" />
    </Card>
  );
};

export default UpcomingMovies;
