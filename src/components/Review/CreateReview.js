import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {Button, Form, Alert} from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';

const CreateReview = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const title = searchParams.get('title');
  const imdbID = searchParams.get('id');

  const submitReview = () => {
    const review = {
      title: reviewTitle,
      imdbID: imdbID,
      reviewText: reviewText,
      rating: rating
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
        {
          (!title|| !imdbID) && 
          <Alert key={'danger'} variant={'danger'}>
            Missing title or id for review, try searching for a movie then clicking the Create Review button.
          </Alert>
        }
        {
          (title && imdbID) &&
          <Form>
            <h3>Creating Review for: {searchParams.get('title')}</h3>
            <Form.Group className="mb-3" controlId="reviewTitle">
              <Form.Label>Review Title:</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter your review title here" 
                value={reviewTitle}
                onChange = {(e) => {setReviewTitle(e.target.value)}}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="reviewText">
              <Form.Label>Review Content:</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={5} 
                placeholder="Enter your review here"
                value={reviewText}
                onChange = {(e) => {setReviewText(e.target.value)}}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="reviewText">
            <Form.Label>Star Rating of this Movie:</Form.Label>
              <div style={{fontSize: "40px"}}>
                <StarRatingComponent
                  name="rating" 
                  starCount={5}
                  value={rating}
                  onStarClick={(e) => {setRating(e)}}
                />
              </div>
            </Form.Group>
            <Button variant="primary" onClick={submitReview}>
              Submit
            </Button>
          </Form>
        }
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default CreateReview;
