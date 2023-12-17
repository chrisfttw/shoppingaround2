import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../googledatebase/config.js';

const CreateReviewPopup = ({ markersId, fetchMarkersAndReview, onClose }) => {
  const [user, setUser] = useState(null);
  const [reviewContent, setReviewContent] = useState('');
  const [rating, setRating] = useState(0); // Default rating is set to 0

  //---CHECK FOR SIGNED IN USER---
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  //---CALL TO DB/ERROR CHECKING---
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.log('Please sign in to create a review.');
      return;
    }

    if (!reviewContent.trim()) {
      console.log('Please enter a review content.');
      return;
    }

    if (rating === 0) {
      console.log('Please select a rating.');
      return;
    }

    try {
      const reviewCollectionRef = collection(db, 'markers', markersId, 'reviews');
      const newReviewDocRef = await addDoc(reviewCollectionRef, {
        content: reviewContent,
        rating: rating,
        timestamp: serverTimestamp(),
        user: user.displayName,
      });

      setReviewContent('');
      setRating(0); // Reset the rating after submitting

      console.log('Review added with ID:', newReviewDocRef.id);

      fetchMarkersAndReview();
      onClose();
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  //---CREATE REVIEW POPUP---
  return (
    <div className="replyPopup">
      <div className="replyPopupContent">
        <button className="closeButton" onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleReviewSubmit} className="replyForm">
          <textarea
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
            placeholder="Write a review..."
            className="formControl"
          />
          <div className="ratingSection">
            Select Rating:
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value}>
                <input
                  type="radio"
                  value={value}
                  checked={rating === value}
                  onChange={() => setRating(value)}
                />
                {value}
              </label>
            ))}
          </div>
          <div>
            <button type="submit" className="replySubmitButton">
              {user ? 'Make A Review' : 'Sign In to Make A Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReviewPopup;
