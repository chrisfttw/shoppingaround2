import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../googledatebase/config.js';

const CreateThread = ({ onClose, onThreadSubmitted }) => {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  //---USER CHECK---
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  //---CALL TO DB/ERROR CHECK---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      console.error('Title and content cannot be empty');
      return;
    }

    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, 'threads'), {
        title,
        content,
        createdAt: serverTimestamp(),
        userThread: user.displayName,
      });

      console.log('Thread created with ID: ', docRef.id);

      setTitle('');
      setContent('');

      onClose();

      onThreadSubmitted();
    } catch (error) {
      console.error('Error creating thread:', error);
    } finally {
      setLoading(false);
    }
  };

  //---CREATE THREAD FORM---
  return (
    <form onSubmit={handleSubmit} className="create-thread-form">
      <div className="form-group">
        <input
          type="text"
          placeholder='Thread Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <textarea
          value={content}
          placeholder='Write Something...'
          onChange={(e) => setContent(e.target.value)}
          className="form-control2"
        />
      </div>
      <button type="submit" disabled={loading} className="submit-button">
        {loading ? 'Creating...' : 'Create Thread'}
      </button>
    </form>
  );
};

export default CreateThread;
