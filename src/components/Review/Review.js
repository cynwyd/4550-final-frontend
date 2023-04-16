import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Alert, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

import reviewService from "../../services/review.service";

const Review = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [reviewInfo, setReviewInfo] = useState(null);

  const { user: currentUser } = useSelector((state) => state.auth);

  const navigateToMovie = () => {
    navigate("/movie/" + reviewInfo.imdbID);
  };

  useEffect(() => {
    reviewService
      .getReview(params.id)
      .then((response) => {
        console.log(response.data.review);
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

  const clickLike = () => {
    reviewService.likeReview(params.id, currentUser.id).then((response) => {
      console.log(response.data.review);
      setReviewInfo(response.data.review);
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          {reviewInfo && (
            <Card>
              <Card.Header as="h2">{reviewInfo.title}</Card.Header>
              <Card.Body>
                <Card.Text>
                  By: <Link to={`/profile/${reviewInfo.owner._id}`}>{reviewInfo.owner.username}</Link>
                </Card.Text>
                <Card.Text>{reviewInfo.reviewText}</Card.Text>
                {reviewInfo.likes && (
                  <>
                    <span>{reviewInfo.likes.length}</span>
                    {reviewInfo.likes.includes(currentUser.id) ? (
                      <AiFillLike
                        onClick={clickLike}
                        style={{
                          color: "red",
                          fontSize: "22px",
                          paddingBottom: "3px",
                          cursor: "pointer",
                        }}
                      ></AiFillLike>
                    ) : (
                      <AiOutlineLike
                        onClick={clickLike}
                        style={{
                          fontSize: "22px",
                          paddingBottom: "3px",
                          cursor: "pointer",
                        }}
                      ></AiOutlineLike>
                    )}
                    <br />
                  </>
                )}
                <Button
                  className="mt-2"
                  variant="primary"
                  onClick={navigateToMovie}
                >
                  See Movie Info
                </Button>
              </Card.Body>
            </Card>
          )}
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default Review;
