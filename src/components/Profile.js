import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { PROFILE_UPDATE } from "../actions/types";

import { Card, ListGroup, Button, Form } from "react-bootstrap";

import UserService from "../services/user.service";
import reviewService from "../services/review.service";

const Profile = () => {
  let { user: currentUser } = useSelector((state) => state.auth);
  const [reviews, setReviews] = useState([]);
  const [editing, setEditing] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");

  useEffect(() => {
    if (currentUser) {
      setNewEmail(currentUser.email);
      setNewPhone(currentUser.phone ? currentUser.phone : "");
      reviewService.getReviewsByUserID(currentUser.id).then((response) => {
        console.log(response.data.reviews);
        setReviews(response.data.reviews);
      });
    }
  }, []);

  const dispatch = useDispatch();

  if(!currentUser) {
    return <Navigate to="/login"></Navigate>
  }

  const submitProfileChanges = () => {
    const body = {
      email: newEmail,
      phone: newPhone,
    };
    UserService.updateUserInfo(body, currentUser.id)
      .then((response) => {
        dispatch({
          type: PROFILE_UPDATE,
          payload: response.data.newUserInfo,
        });
        setEditing(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <Card>
            <Card.Header as="h2">
              Profile Page for: {currentUser.username}
            </Card.Header>
            <Card.Body>
              {editing ? (
                <Form>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={newEmail}
                      onChange={(e) => {
                        setNewEmail(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter phone number"
                      value={newPhone}
                      onChange={(e) => {
                        setNewPhone(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={submitProfileChanges}>
                    Submit
                  </Button>
                </Form>
              ) : (
                <>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>Email: {currentUser.email}</ListGroup.Item>
                    <ListGroup.Item className="mt-2">
                      Phone:{" "}
                      {currentUser.phone
                        ? currentUser.phone
                        : "No Phone Number Set"}
                    </ListGroup.Item>
                  </ListGroup>
                  <Button
                    variant="primary"
                    className="mt-2"
                    onClick={() => {
                      setEditing(!editing);
                    }}
                  >
                    Edit Profile Content
                  </Button>
                </>
              )}{" "}
            </Card.Body>
            <Card.Body>
              <Card.Title>Reviews by {currentUser.username}:</Card.Title>
              {reviews.length > 0 &&
                reviews.map((review) => {
                  return (
                    <Card key={review._id}>
                      <Card.Header as="h2">{review.title}</Card.Header>
                      <Card.Body>
                        <Card.Text>Rating: {review.rating}/5</Card.Text>
                        <Card.Link href={`/review/details/${review._id}`}>
                          See Full Review
                        </Card.Link>
                      </Card.Body>
                    </Card>
                  );
                })}
            </Card.Body>
          </Card>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default Profile;
