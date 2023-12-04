// CreateThread.js
import React, { useState } from 'react';
import { db } from '../../googledatebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const CreateThread = ({ onClose}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

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
      });

      console.log('Thread created with ID: ', docRef.id);

      setTitle('');
      setContent('');

      onClose();
    } catch (error) {
      console.error('Error creating thread:', error);
    } finally {
      setLoading(false);
    }
  };

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
