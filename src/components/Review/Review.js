import React, { useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Alert, Card, Button } from "react-bootstrap";

import reviewService from "../../services/review.service";

const Review = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [reviewInfo, setReviewInfo] = useState({});

  const navigateToMovie = () => {
    navigate('/movie/' + reviewInfo.imdbID);
  }

  useEffect(() => {
    reviewService
      .getReview(params.id)
      .then((response) => {
        setReviewInfo(response.data.review);
      })
      .catch((err) => {
        console.log(err);
        return (
          <Alert key={"danger"} variant={"danger"}>
            Missing title or id for review, try searching for a movie then
            clicking the Create Review button.
          </Alert>
        );
      });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          {
            reviewInfo != {} && 
            <Card>
              <Card.Header as="h2">{reviewInfo.title}</Card.Header>
              <Card.Body>
                <Card.Text>{reviewInfo.reviewText}</Card.Text>
                <Button variant="primary" onClick={navigateToMovie}>
                  See Movie Info
                </Button>
              </Card.Body>
            </Card>
          }
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default Review;
