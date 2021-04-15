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
  return (
    <Row gutter={[15, 15]} >
      {movies && movies.map(movie => {
        const { id, title, poster_path } = movie;
        const existInMyFavorites = user?.favoritesMovies?.find(movieFav => movieFav.id === movie.id);
        return (
          <Col key={id} xs={24} sm={12} md={6} lg={6} xl={4} xxl={4} >
            <Card
              style={{ height: '100%' }}
              hoverable
              cover={
                <img
                  alt="poster"
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  style={{ height: '100%' }}
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
          </Col>
        )
      })}
    </Row>
  );
}

export default ListMoviesContainer;