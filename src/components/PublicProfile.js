import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Card, Container, ListGroup, Row, Col, Button } from "react-bootstrap";

import UserService from "../services/user.service";
import reviewService from "../services/review.service";

const PublicProfile = () => {
  let { user: currentUser } = useSelector((state) => state.auth);
  const [userInfo, setUserInfo] = useState(null);
  const [reviews, setReviews] = useState([]);
  const params = useParams();

  useEffect(() => {
    UserService.getUserInfo(params.id).then((response) => {
      console.log(response.data.userInfo);
      setUserInfo(response.data.userInfo);
      reviewService.getReviewsByUserID(response.data.userInfo.id).then((response) => {
        console.log(response.data.reviews);
        setReviews(response.data.reviews);
      });
    });
  }, []);

  const followUser = () => {
    UserService.followUser(params.id).then((response) => {
      console.log(response.data);
      setUserInfo(response.data.userInfo);
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          {userInfo && (
            <Card>
              <Card.Header as="h2">
                Profile Page for: {userInfo.username}
              </Card.Header>
              <Card.Body>
                <Container>
                  <Row>
                    <Col>
                      <ListGroup>
                        <ListGroup.Item>Followers:</ListGroup.Item>
                        {userInfo.followers.map((follower) => {
                          return (
                            <ListGroup.Item key={follower._id}>
                              <Card.Link href={`/profile/${follower._id}`}>
                                {follower.username}
                              </Card.Link>
                            </ListGroup.Item>
                          );
                        })}
                      </ListGroup>
                    </Col>
                    <Col>
                      <ListGroup>
                        <ListGroup.Item>Following:</ListGroup.Item>
                        {userInfo.following.map((following) => {
                          return (
                            <ListGroup.Item key={following._id}>
                              <Card.Link href={`/profile/${following._id}`}>
                                {following.username}
                              </Card.Link>
                            </ListGroup.Item>
                          );
                        })}
                      </ListGroup>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
              <Card.Body>
                <div className="d-grid gap-2">
                  {currentUser.id !== userInfo.id &&
                    (userInfo.followers.filter((e) => e._id === currentUser.id)
                      .length > 0 ? (
                      <Button
                        variant="secondary"
                        width="100%"
                        onClick={followUser}
                      >
                        Unfollow
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        width="100%"
                        onClick={followUser}
                      >
                        Follow
                      </Button>
                    ))}
                </div>
              </Card.Body>
              <Card.Body>
                <Card.Title>Reviews by {currentUser.username}:</Card.Title>
                {reviews.length > 0 &&
                  reviews.map((review) => {
                    return (
                      <Card key = {review._id}>
                        <Card.Header as="h2">{review.title}</Card.Header>
                        <Card.Body>
                          <Card.Text>Rating: {review.rating}/5</Card.Text>
                          <Card.Link href={`/review/${review._id}`}>
                            See Full Review
                          </Card.Link>
                        </Card.Body>
                      </Card>
                    );
                  })}
              </Card.Body>
            </Card>
          )}
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default PublicProfile;
