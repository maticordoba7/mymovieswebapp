import { Card, Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getResultSearch } from '../api/apiCalls';
import ListMoviesContainer from './containers/ListMoviesContainer';

function SearchResults() {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  useEffect(() => {
    getResultSearch(query)
      .then(({ data }) => {
        setResults(data.results)
      })
  }, [query])
  return (
    <Card>
      <Divider orientation="left">Search results</Divider>
      <ListMoviesContainer movies={results} stringKey="SearchResults"/>
    </Card>

  );
}

export default SearchResults;