import React from 'react';
import './Modal.css';

function Modal({ show, handleClose, children }) {

  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content text-center d-flex justify-content-center align-items-center">
        {children}
        <button className = "btn black-btn btn-md w-50 mmt-3" onClick={handleClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;