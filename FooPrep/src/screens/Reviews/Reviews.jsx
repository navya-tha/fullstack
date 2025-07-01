
import React from 'react';
import './Reviews.css';

const reviews = [
  {
    name: 'Ananya Sharma',
    rating: 5,
    comment: 'Absolutely loved the food and presentation! The ordering experience was seamless. Highly recommend this site for quick and tasty meals.'
  },
  {
    name: 'Rahul Verma',
    rating: 5,
    comment: 'Delicious and fresh! Every dish tastes homemade and comforting. This is my go-to food delivery site now.'
  },
  {
    name: 'Priya Desai',
    rating: 5,
    comment: 'Amazing service and flavors! The user interface is friendly, and delivery is always on time. Great job, team!'
  }
];

const Reviews = () => {
  return (
    <div className="reviews-section">
      <h2>What Our Customers Say</h2>
      <div className="reviews-container">
        {reviews.map((review, index) => (
          <div className="review-card" key={index}>
            <h3>{review.name}</h3>
            <div className="stars">
              {'★'.repeat(review.rating)}
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;