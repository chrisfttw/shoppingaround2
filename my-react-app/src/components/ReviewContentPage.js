import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../googledatebase/config.js';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import CreateReviewPopup from './CreateReviewPopup.js';

const ReviewContentPage = () => {
    const [marker, setMarker] = useState({});
    const { markersId } = useParams();
    const [isPopupOpen, setPopupOpen] = useState(false);

    //---POPUP LOGIC---
    const openPopup = () => {
        setPopupOpen(true);
      };
      const closePopup = () => {
        setPopupOpen(false);
      };

    //---CALL TO DB---
    const fetchMarkersAndReview = async () => {
      try {
        if (!markersId) {
          console.error('Marker ID is undefined');
          return;
        }
    
        const markerDocRef = doc(db, 'markers', markersId);
        const markerDoc = await getDoc(markerDocRef);
    
        if (markerDoc.exists()) {
          const markerData = markerDoc.data();
    
          const reviewsCollectionRef = collection(db, 'markers', markersId, 'reviews');
          const reviewsQuerySnapshot = await getDocs(reviewsCollectionRef);
          const reviewsData = reviewsQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    
          reviewsData.sort((a, b) => a.timestamp.toMillis() - b.timestamp.toMillis());
    
          console.log('Marker Data:', markerData);
          console.log('Reviews Data:', reviewsData);
    
          setMarker({ ...markerData, reviews: reviewsData });
        } else {
          console.error('Marker not found');
        }
      } catch (error) {
        console.error('Error fetching marker:', error);
      }
    };
      
    //---USE EFFECT FOR MARKERS---
    useEffect(() => {
        fetchMarkersAndReview();
    }, [markersId]);

    //---ERROR CHECK FOR MARKER---
    if (!marker) {
        return <div>Problem loading...</div>;
    }

    //---CONSOLE CHECK---
    const handleReplySubmit = (reviewContent) => {
        console.log('Submitting reply to the database:', reviewContent);
    };

  //---REVIEW CONTENT PAGE---
  return (
    <div className='reviewsPageContainer'>
      <div className='reviewsStore'>
        {marker && marker.imageUrl && <img src={marker.imageUrl} alt="storeimage" className="storeImage" />}
        {marker && <h3 className="storeTitle">{marker.popUp}</h3>}
        {marker && <h4 className="storeAddress">{marker.address}</h4>}
        {marker && marker.website && (
          <a href={marker.website} className='reviewsSite'>
            <h4 className="storeWebsite">{marker.website}</h4>
          </a>
        )}
  
        {/* Calculate average rating */}
        {marker.reviews && marker.reviews.length > 0 && (
          <h4 className="averageRating">
            average rating: {(
              marker.reviews.reduce((sum, review) => sum + review.rating, 0) /
              marker.reviews.length
            ).toFixed(1)}
          </h4>
        )}
      </div>
  
      <div className="reviews">
        {marker.reviews &&
          marker.reviews.map((review) => (
            <div key={review.id} className="reviewCard">
              <h3 className='reviewUser'>review by {review.user}</h3>
              <h4 className='reviewRating'>rating: {review.rating}/5 </h4>
              <p className='review'>{review.content}</p>
            </div>
          ))}
      </div>
  
      <div className='makeReviewFixed'>
        <button onClick={openPopup} className='makeReviewButton'>Make A Review</button>
        {isPopupOpen && (
          <CreateReviewPopup
            onClose={closePopup}
            markersId={markersId}
            fetchMarkersAndReview={fetchMarkersAndReview}
            onSubmit={handleReplySubmit}
          />
        )}
      </div>
    </div>
  );           
}        

export default ReviewContentPage;
