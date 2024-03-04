import React from 'react';
import './Modal.css';

function Modal({ show, handleClose, children }) {

  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={handleClose}>Close</button>
        {children}
      </div>
    </div>
  );
}

export default Modal;