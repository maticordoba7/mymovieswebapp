import React, { useContext } from 'react';
import { Card, Col, notification, Row } from 'antd';
import { StoreContext } from '../../store/StoreProvider';
import { types } from '../../store/storeReducer';
import { StarFilled, EyeOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import { db } from '../../firebase';


function ListMoviesContainer({ movies }) {
  const [store, dispatch] = useContext(StoreContext);
  const history = useHistory();
  const { user } = store;
  const handleAddToFavorite = async (movie, existInMyFavorites) => {
    const userDocRef = await db.collection('users').doc(user.uid);
    const userRef = await userDocRef.get()
    const userData = await userRef.data();
    console.log({ userData, existInMyFavorites })
    existInMyFavorites ?
      userDocRef.set({ ...userData, favoritesMovies: userData.favoritesMovies.filter(m => m.id !== movie.id) })
      :
      userDocRef.set({ ...userData, favoritesMovies: [...userData.favoritesMovies, movie] })
    notification.success({
      message:
        existInMyFavorites
          ?
          'This movie was deleted from favories'
          :
          'This movie was add to favorites',
      placement: "bottonRight",
    })
  };
  const handleSeeDetailMovie = movie => {
    dispatch({
      type: types.SEE_DETAIL_MOVIE,
      payload: movie,
    });
    history.push(`/detailmovie/${movie.id}`)
  }
  console.log({ movies })
  return (
    <div style={{ display: 'flex', overflowX: "scroll" }}>
      {movies && movies.map(movie => {
        const { id, title, poster_path } = movie;
        const existInMyFavorites = user?.favoritesMovies?.find(movieFav => movieFav.id === movie.id);
        return (
          <Card
            hoverable
            style={{
              width: '170px',
              minWidth: '170px',
              maxWidth: '170px',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              margin: '20px 10px',
            }}
            cover={
              <img
                alt="poster"
                src={`https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}`}
                style={{
                  height: '225px',
                  maxHeight: '225px',
                  minHeight: '225px',
                  width: '150px',
                  minWidth: '150px',
                  maxWidth: '150px',
                  borderRadius: '10px'

                }}
              />
            }
            actions={[
              <EyeOutlined
                onClick={() => {
                  handleSeeDetailMovie(movie)
                }}
              />,
              <StarFilled
                style={{ color: existInMyFavorites ? '#dbdb12' : 'black' }}
                onClick={() => {
                  handleAddToFavorite(movie, existInMyFavorites)
                }} />,
            ]}
          >
            <Card.Meta title={`${title}`} />

            {/* <Button onClick={() => {
                handleAddToFavorite(movie, existInMyFavorites)
              }}
                style={{ width: '100%' }}
              >
                {existInMyFavorites ? 'Delete favorite' : 'Add favorite'}
              </Button> */}
          </Card>
        )
      })}
    </div >
  );
}

export default ListMoviesContainer;