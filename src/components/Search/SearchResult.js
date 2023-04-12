import React, { useState, useEffect } from "react";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const SearchResult = ({searchResult}) => {
  return (
    <Card style={{ width: '16rem'}}>
      {
        searchResult.Poster ? 
        <Card.Img width="16rem" height="250px" variant="top" src={searchResult.Poster} /> :
        <Card.Text>
          No Poster Available
        </Card.Text>
      }
      <Card.Body>
        <Card.Title>{searchResult.Title}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Type: {searchResult.Type}</ListGroup.Item>
        <ListGroup.Item>Year: {searchResult.Year}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">See More</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default SearchResult;
