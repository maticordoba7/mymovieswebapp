import React, { useContext } from 'react';
import { Badge, Card, notification } from 'antd';
import { StoreContext } from '../../store/StoreProvider';
import { StarFilled, EyeOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import { db, moviesCollection, usersCollection, increment, decrement } from '../../firebase';

function ListMoviesContainer({ movies, favoritesByUsers, stringKey }) {
  const [store, dispatch] = useContext(StoreContext);
  const history = useHistory();
  const { user } = store;
  if (favoritesByUsers) {
    movies = movies.sort((a, b) => b.favoritesCount - a.favoritesCount).filter(a => a.favoritesCount !== 0)
  }
  const handleAddToFavorite = async (movie, existInMyFavorites) => {
    delete movie.favoritesCount;
    const batch = db.batch()
    const userDocRef = await usersCollection.doc(user.uid);
    const userRef = await userDocRef.get()
    const userData = await userRef.data();
    const movieCollection = moviesCollection.doc(movie.id.toString())
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
    batch.set(movieCollection, { movie: { ...movie }, favoritesCount: existInMyFavorites ? decrement : increment }, { merge: true });
    return batch.commit()
  };
  const handleSeeDetailMovie = movie => {
    history.push(`/detailmovie/${movie.id}`)
  }
  return (
    <div style={{ display: 'flex', overflowX: "scroll" }}>
      {movies && movies.map(movie => {
        const { id, title, poster_path } = movie;
        const existInMyFavorites = user?.favoritesMovies?.find(movieFav => movieFav.id === movie.id);
        return (
          <Card
            key={`${id}${stringKey}`}
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
              <>
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
                {favoritesByUsers ?
                  <Badge count={movie.favoritesCount} showZero /> : null
                }
              </>
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