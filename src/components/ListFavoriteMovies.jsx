import { Card, Divider } from 'antd';
import React, { useContext } from 'react';
import { StoreContext } from '../store/StoreProvider';
import ListMoviesContainer from './containers/ListMoviesContainer';

function ListFavoriteMovies(props) {
  const [store] = useContext(StoreContext);
  const { user } = store;
  return (
    <Card>
      <Divider orientation="left">Favorites movies</Divider>
      <ListMoviesContainer movies={user?.favoritesMovies} key='ListFavoriteMovies'/>
    </Card>
  );
}

export default ListFavoriteMovies;