import React, { useEffect, useState } from 'react';
import ListMoviesContainer from './containers/ListMoviesContainer';
import { getNowPlayingMovies, getUpcomingMovies } from '../api/apiCalls';
import { Card, Divider } from 'antd';

function NowPlayingMovies() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([])
  useEffect(() => {
    getNowPlayingMovies()
      .then(({ data }) => {
        console.log(data)
        setNowPlayingMovies(data.results)
      })
  }, [])

  return (
    <Card >
      <Divider orientation="left">Now playing movies</Divider>
      <ListMoviesContainer movies={nowPlayingMovies.reverse()} stringKey="NowPlayingMovies" />
    </Card>
  );
};

export default NowPlayingMovies;
