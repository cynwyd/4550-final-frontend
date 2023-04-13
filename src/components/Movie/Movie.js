import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {Button, Card, Container, Row, Col, ListGroup} from 'react-bootstrap';

import MovieService from "../../services/movie.service";
import ReviewService from "../../services/review.service";


const Movie = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [movieInfo, setMovieInfo] = useState({});
  const [reviews, setReviews] = useState({});

  useEffect(() => {
    MovieService.getMovieByID(params.id).then((result) => {
      setMovieInfo(result.data);
      console.log(result.data);
    }).catch((err) => {
      console.log("Error retrieving Movie by ID.")
      console.log(err);
    });
  }, [params])

  useEffect(() => {
    if(movieInfo.imdbID) {
      ReviewService.getReviewsByMovieID(movieInfo.imdbID).then((result) => {
        console.log(result.data.reviews);
        setReviews(result.data.reviews);
      }).catch((err) => {
        console.log(err);
      });
    }
  }, [movieInfo])

  const createReview = () => {
    navigate(`/review/create?title=${movieInfo.Title}&id=${movieInfo.imdbID}`);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
        <Card>
          <Card.Header as="h2">{movieInfo.Title}</Card.Header>
          <Card.Body>
            <Container>
              <Row>
                <Col>
                  {
                    movieInfo.Poster ? 
                    <Card.Img variant="top" src={movieInfo.Poster} /> :
                    <Card.Text>
                      No Poster Available
                    </Card.Text>
                  }
                </Col>
                <Col>
                <ListGroup className="list-group-flush">
                  {movieInfo.Released && <ListGroup.Item>Release Date: {movieInfo.Released}</ListGroup.Item>}
                  {movieInfo.Rated && <ListGroup.Item>Rating: {movieInfo.Rated}</ListGroup.Item>}
                  {movieInfo.Runtime && <ListGroup.Item>Runtime: {movieInfo.Runtime}</ListGroup.Item>}
                  {movieInfo.Genre && <ListGroup.Item>Genre: {movieInfo.Genre}</ListGroup.Item>}
                  {movieInfo.Director && <ListGroup.Item>Director: {movieInfo.Director}</ListGroup.Item>}
                  {movieInfo.Writer && <ListGroup.Item>Writer: {movieInfo.Writer}</ListGroup.Item>}
                  {movieInfo.Actors && <ListGroup.Item>Actors: {movieInfo.Actors}</ListGroup.Item>}
                  {movieInfo.Language && <ListGroup.Item>Language: {movieInfo.Language}</ListGroup.Item>}
                  {movieInfo.Country && <ListGroup.Item>Country: {movieInfo.Country}</ListGroup.Item>}
                  {movieInfo.Awards && <ListGroup.Item>Awards: {movieInfo.Awards}</ListGroup.Item>}
                </ListGroup>
                </Col>
              </Row>
            </Container>
            <Card.Title className = "mt-2">
              Plot:
            </Card.Title>
            <Card.Text>
              {movieInfo.Plot && movieInfo.Plot}
            </Card.Text>
            <Button variant="primary" onClick = {createReview}>Write a Review</Button>
          </Card.Body>
          <Card.Body>
            <Card.Title>
              Reviews for {movieInfo.Title}:
            </Card.Title>
            {
              reviews.length > 0 &&
              reviews.map((review) => {
                return(
                  <Card>
                    <Card.Header as="h2">{review.title}</Card.Header>
                    <Card.Body>
                      <Card.Text>Rating: {review.rating}/5</Card.Text>
                      <Card.Link href={`/review/${review._id}`}>See Full Review</Card.Link>
                    </Card.Body>
                  </Card>
                );
              })
            }
          </Card.Body>
        </Card>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default Movie;
