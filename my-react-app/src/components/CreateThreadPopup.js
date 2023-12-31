import React from 'react';
import CreateThread from './pages/createThread.js';

//---CREATE THREAD POPUP---
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
