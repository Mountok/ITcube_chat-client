import React, { useState, useEffect } from "react";
import "./Modal.css";

const Modal = ({ message, isError, onClose }) => {
  const [counter, setCounter] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (counter === 0) {
      onClose();
    }
  }, [counter, onClose]);

  return (
    <div className="modal-overlay">
      <div className={`modal-content ${isError ? "error" : "success"}`}>
        <div className="modal-message">{message}</div>
        
        <div className="modal-progress">
          <div
            className="modal-progress-bar"
            style={{ width: `${(counter / 3) * 100}%` }}
          ></div>
        </div>
        <div className="modal-counter">{counter}</div>
        <button className="modal-close" onClick={onClose}>
          <span className="modal-close-icon">X</span>
        </button>
      </div>
    </div>
  );
};

export default Modal;
