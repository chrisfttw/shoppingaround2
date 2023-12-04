// CreateThreadPopup.js
import React, { useState } from 'react';
import CreateThread from './pages/createThread'; // Import your existing CreateThread component

const CreateThreadPopup = ({ onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <button onClick={onClose} className="close-button">
          &times;
        </button>
        <CreateThread />
      </div>
    </div>
  );
};

export default CreateThreadPopup;
