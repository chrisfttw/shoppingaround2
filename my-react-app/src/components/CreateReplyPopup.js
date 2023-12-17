import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../googledatebase/config.js';

const CreateReplyPopup = ({ threadId, fetchThreadAndReplies, onClose }) => {
  const [user, setUser] = useState(null);
  const [replyContent, setReplyContent] = useState('');

  //---CHECK FOR SIGNED IN USER---
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  //---CALL TO DB/ERROR CHECK---
  const handleReplySubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.log('Please sign in to reply.');
      return;
    }

    if (!replyContent.trim()) {
      return;
    }

    try {
      const repliesCollectionRef = collection(db, 'threads', threadId, 'replies');
      const newReplyDocRef = await addDoc(repliesCollectionRef, {
        content: replyContent,
        timestamp: serverTimestamp(),
        user: user.displayName,
      });

      setReplyContent('');

      console.log('Reply added with ID:', newReplyDocRef.id);

      fetchThreadAndReplies();
      onClose(); 
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  //---CREATE REPLY POPUP---
  return (
    <div className="replyPopup">
      <div className="replyPopupContent">
        <button className="closeButton" onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleReplySubmit} className='replyForm'>
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write a reply..."
            className='formControl'
          />
          <div>
            <button type="submit" className='replySubmitButton'>
              {user ? 'Reply' : 'Sign In to Reply'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReplyPopup;
