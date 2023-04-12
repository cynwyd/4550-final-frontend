import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import MovieService from "../../services/movie.service";

import SearchResult from "./SearchResult";

const Search = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchTitle, setSearchTitle] = useState(searchParams.get('title'));
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(searchTitle);
      if(searchTitle != ""){
        setSearchParams({title: searchTitle})
        MovieService.searchMovie(searchTitle).then((response) => {
          const newResults = response.data.Search;
          setSearchResults(newResults);
        });
      }
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTitle]);

  useEffect(() => {
    const title = searchParams.get('title');
    if(title) {
      setSearchTitle(title);
    }
  }, [searchParams]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <header className="jumbotron">
            <h3>Search Movies</h3>
          </header>
          <InputGroup>
            <InputGroup.Text id="basic-addon1">Title: </InputGroup.Text>
            <Form.Control
              placeholder="Search the Title of a Movie"
              aria-label="Movie"
              aria-describedby="basic-addon1"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
          </InputGroup>
        </div>
        <div className="col-2"></div>
      </div>
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <div className="row">
            {
              (searchResults === undefined) &&
              <h3>No Results, try a different search.</h3>
            }
            {
              (searchResults != undefined && searchResults.length != 0) &&
              searchResults.map((result) => {
                return(
                  <SearchResult searchResult={result} key={result.imdbID}/>
                );
              })
            }
          </div>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default Search;
