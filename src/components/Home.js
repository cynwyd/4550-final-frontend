import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import UserService from "../services/user.service";

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if(currentUser) {
      UserService.getUserContent(currentUser.id).then((response) => {
        const reviews = [...response.data.reviews];
        setReviews(reviews);
      }).catch((err) => {
        console.log(err);
      });
    }else {
      UserService.getPublicContent().then((response) => {
        const reviews = [...response.data.reviews];
        setReviews(reviews);
      }).catch((err) => {
        console.log(err);
      });
    }
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-8">
          <h2>Welcome to Film Scout! Here are {currentUser ? "the most recent movie reviews for you" : "the most recent movie reviews"}</h2>
        {
          reviews.map((review) => {
            return (
            <Card key = {review._id}>
              <Card.Header as="h2">{review.title}</Card.Header>
              <Card.Body>
                <Card.Text>
                  By: <Link to={`/profile/${review.owner._id}`}>{review.owner.username}</Link>
                </Card.Text>
                <Card.Text>
                  {review.reviewText.substring(0, 40)}...
                </Card.Text>
                <Card.Text>
                  Rating: {review.rating}/5
                </Card.Text>
                <Card.Link href={`/review/details/${review._id}`}>See Full Review</Card.Link>
              </Card.Body>
            </Card>);
          })
        }
        </div>
        <div className="col-lg-2"></div>
      </div>
    </div>
  )
};

export default Home;
