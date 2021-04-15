import { Card, Divider } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { moviesCollection } from '../firebase';
import ListMoviesContainer from './containers/ListMoviesContainer';

function FavoritesByUsers(props) {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    moviesCollection.onSnapshot((docs) => {
      console.log({ docs });
      docs.forEach((querySnapshot) => {
        const { movie, favoritesCount } = querySnapshot.data()
        setFavorites((prev) => [...prev, { ...movie, favoritesCount }])
      })
    })
    setLoading(false)
    console.log('termino de iterar', loading)
  }, [])
  console.log({ favorites, loading })

  return (
    <Card>
      <Divider orientation="left">Most added to favorites by users</Divider>
      {!loading ?
        <ListMoviesContainer movies={favorites} favoritesByUsers={true} stringKey='favoritesByUser' />
        :
        null
      }
    </Card>
  );
}

export default FavoritesByUsers;