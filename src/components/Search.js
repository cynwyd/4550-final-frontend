import React, { useState, useEffect } from "react";

import MovieService from "../services/movie.service";

const Search = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [content, setContent] = useState("Search Page");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(searchTitle);
      if(searchTitle != ""){
        MovieService.searchMovie(searchTitle).then((response) => {
          console.log(response.data);
        });
      }
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTitle]);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
      <input
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
      ></input>
    </div>
  );
};

export default Search;
