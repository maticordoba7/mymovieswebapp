import React, { useContext } from 'react';
import { StoreContext } from '../store/StoreProvider';
import ListMoviesContainer from './containers/ListMoviesContainer';

function SearchResults() {
  const [store] = useContext(StoreContext);
  const { searchResults } = store;
  return (
    <ListMoviesContainer movies={searchResults} />
  );
}

export default SearchResults;