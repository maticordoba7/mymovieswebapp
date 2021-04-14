import React, { useContext, useEffect, useReducer } from 'react';
import { Layout } from 'antd';
import ListPopularMovies from '../ListPopularMovies';
import TopRatedMovies from '../TopRatedMovies';
import { Route, Switch, useRouteMatch } from 'react-router';
import ListFavoriteMovies from '../ListFavoriteMovies';
import SearchResults from '../SearchResults';
import DetailMovie from '../DetailMovie';
import { auth, db } from '../../firebase';
import { StoreContext } from '../../store/StoreProvider';
import { types } from '../../store/storeReducer';

function ContentComponent(props) {
  const { Content } = Layout;
  const { path } = useRouteMatch();
  const [store, dispatch] = useContext(StoreContext);
  const getData = async () => {
    if (store.user !== null) {
      await db.collection('users')
        .doc(store.user.uid)
        .onSnapshot(querySnapshot => {
          console.log('get data')
          dispatch({
            type: types.SET_DATA_USER,
            payload: querySnapshot.data(),
          })
        })
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged(({ email, uid }) => {
      console.log('state changed')
      dispatch({
        type: types.SET_DATA_USER,
        payload: { email, uid }
      })
    })
  }, [])
  useEffect(() => {
    getData()
  }, [store.user?.uid])
  db.collection('user')
  return (
    <Content>
      <Switch>
        <Route exacth path={`${path}/`}  >
          <>
            <ListPopularMovies />
            <TopRatedMovies />
          </>
        </Route>
        <Route exacth path={`${path}favorites`}>
          <ListFavoriteMovies />
        </Route>
        <Route exacth path={`${path}searchresults`}>
          <SearchResults />
        </Route>
        <Route exacth path={`${path}detailmovie`}>
          <DetailMovie />
        </Route>
      </Switch>
    </Content>
  );
}

export default ContentComponent;